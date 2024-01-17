import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import RootBlockComponent from "./root-block-component";
import { Plugin } from "prosemirror-state";
import { v4 as uuidv4 } from "uuid";
import { TextSelection } from "@tiptap/pm/state";



// Extend the Commands interface to include RootBlockCommands
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    RootBlockCommands: {
      setRootBlock: (position?: number) => ReturnType;
    };
  }
}

// Create and export the RootBlock node
export const RootBlock = Node.create({
  name: "rootblock",
  group: "rootblock",
  content: "block", // Ensure only one block element inside the rootblock
  draggable: true, // Make the node draggable
  selectable: true, // Node isn't selectable
  inline: false, // Node is a block-level element
  priority: 1000, // Priority for node resolution

  // Default options for the node
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  // Define commands specific to the RootBlock node
  addCommands() {
    return {
      setRootBlock:
        (position) =>
        ({ state, chain }) => {
          const {
            selection: { from },
          } = state;

          // Determine the insertion position
          const pos = position ?? from;

          // Generate a unique blockId
          const blockId = uuidv4();

          // Insert a new rootblock node and focus on it
          return chain()
            .insertContentAt(pos, {
              type: "rootblock",
              attrs: { blockId },
              content: [
                {
                  type: "paragraph",
                },
              ],
            })
            .focus(pos + 4)
            .run();
        },
    };
  },

  // Define the attributes for the node
  addAttributes() {
    return {
      // ... other attributes ...
      blockId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-block-id"),
        renderHTML: (attributes) => {
          if (!attributes.blockId) {
            attributes.blockId = uuidv4(); // Generate a unique blockId if it's not already set
          }
          return {
            "data-block-id": attributes.blockId,
          };
        },
      },
    };
  },

 
  // Define keyboard shortcuts for the RootBlock node
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setRootBlock(),
    };
  },

  // Rules to parse the node from HTML
  parseHTML() {
    return [
      {
        tag: 'div[data-type="rootblock"]',
      },
    ];
  },

  // Rules to render the node to HTML
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "rootblock",
        "data-block-id": HTMLAttributes.blockId || uuidv4(),
      }),
      0,
    ];
  },

  

  // Use ReactNodeViewRenderer to render the node view with the RootBlockComponent
  addNodeView() {
    return ReactNodeViewRenderer(RootBlockComponent);
  },
});

export default RootBlock;
