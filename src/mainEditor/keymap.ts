import { Extension } from "@tiptap/core";
import { Plugin } from "prosemirror-state";

// Extend the Commands interface to include the handleEnterKey command for Keymap
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    Keymap: {
      handleEnterKey: () => ReturnType;
    };
  }
}

// Define a helper function to manage local storage
const localStorageKey = "lastEnterPress";

function getLastEnterPress() {
  const data = localStorage.getItem(localStorageKey);
  return data ? JSON.parse(data) : { count: 0, pos: null };
}

function setLastEnterPress(data) {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
}

// Define and create the Keymap extension
const Keymap = Extension.create({
  name: "Keymap",

  // Define custom commands for the extension
  addCommands() {
    return {
      handleEnterKey:
        () =>
        ({ state, chain }) => {
          const { selection, doc, schema } = state;
          const { $from, $to } = selection;
          const isCodeBlock = $from.parent.type === schema.nodes.codeBlock;
          let lastEnterPress = getLastEnterPress();

          console.log("newCount", lastEnterPress);

          if ($from.node(-1).type.name === "rootblock" && isCodeBlock) {
            let lastEnterPress = getLastEnterPress(); // Get the latest value from local storage

            // Increment count for each Enter press within the code block
            const newCount = lastEnterPress.count + 1;

            // Update lastEnterPress in local storage
            setLastEnterPress({ count: newCount, pos: $from.pos });

            if (newCount >= 3) {
              // Reset the counter in storage
              setLastEnterPress({ count: 0, pos: null });

              // Create a new rootblock with a paragraph after the code block
              return chain()
                .insertContentAt($from.pos, {
                  type: "rootblock",
                  content: [{ type: "paragraph" }],
                })
                .focus($from.pos + 4)
                .run();
            }

            // Insert a newline in the code block
            return chain().insertContent("\n").run();
          } else {
            // Reset the counter when not in a code block
            setLastEnterPress({ count: 0, pos: null });
          }

          // Reset lastEnterPress when not in a code block
          setLastEnterPress({ count: 0, pos: null });

          // Check if the cursor is within a rootblock, no selection is made, and if it's at the end of a block.
          if (
            $from.node(-1).type.name === "rootblock" &&
            $from.parent.type.isBlock &&
            $to.pos === $from.pos
          ) {
            if ($to.pos === $from.end()) {
              // Create and focus on a new root block with a paragraph inside at the cursor position
              return chain()
                .insertContentAt($from.pos, {
                  type: "rootblock",
                  content: [
                    {
                      type: "paragraph",
                    },
                  ],
                })
                .focus($from.pos + 4)
                .run();
            } else {
              console.log("Cursor is not at the end of the block");

              let currentActiveNodeTo = -1;

              // Iterate over document nodes to find the active node's end position.
              doc.descendants((node, pos) => {
                if (currentActiveNodeTo !== -1) return false;
                if (node.type.name === "rootblock") return;

                const [nodeFrom, nodeTo] = [pos, pos + node.nodeSize];
                if (nodeFrom <= $from.pos && $to.pos <= nodeTo)
                  currentActiveNodeTo = nodeTo;

                return false;
              });

              const content = doc
                .slice($from.pos, currentActiveNodeTo)
                ?.toJSON().content;

              // Replace content from cursor to the end of the block with new content.
              return chain()
                .insertContentAt(
                  { from: $from.pos, to: currentActiveNodeTo },
                  {
                    type: "rootblock",
                    content,
                  }
                )
                .focus($from.pos + 4)
                .run();
            }
          }

          // Reset lastEnterPress when not in a code block
          // lastEnterPress = { count: 0, pos: null };
          setLastEnterPress({ count: 0, pos: null });

          // If conditions aren't met, use the default Enter behavior
          return false;
        },
    };
  },

  // Add a ProseMirror plugin to handle all keydown events
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleKeyDown: (view, event) => {
            console.log("handleKeyDown", event.key);

            // Check if the key pressed is not Enter
            if (event.key !== "Enter") {
              // Update lastEnterPress when a non-Enter key is pressed
              setLastEnterPress({ count: 0, pos: null });
              let lastEnterPress = getLastEnterPress();
              console.log("newCount of lastEnterPress", lastEnterPress);
            }

            // Return false to indicate that this keydown event is not handled here
            // and should be propagated to other keydown handlers (including the default ones)
            return false;
          },
        },
      }),
      // ... [Include other plugins if needed] ...
    ];
  },

  // Define keyboard shortcuts for the extension
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => editor.commands.handleEnterKey(), // Call handleEnterKey command on Enter key press
    };
  },
});

export default Keymap;
