import { Extension, Editor, Range } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance } from "tippy.js";
import {
  Heading1,
  Heading2,
  Heading3,
  Text,
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Quote,
} from "lucide-react";
import { ReactNode } from "react";
import CommandsView from "./CommandsView";

// Define the structure of command item properties
/* interface CommandItemProps {
    title: string;
    attrs: { [key: string]: string };
    icon: ReactNode;
    command: (params: { editor: Editor; range?: Range }) => void;
  } */

// Define the structure of CommandProps
/*   interface CommandProps {
  editor: Editor;
  range: Range;
  props: any; // Update this to include command
  command?: (params: { editor: Editor; range?: Range; props?: any }) => void;
} */

const CommandsPlugin = Extension.create({
  name: "insertMenu",
  addProseMirrorPlugins() {
    return [
      Suggestion<CommandProps>({
        editor: this.editor,
        char: "/",
        command: ({ editor, range, props }) => {
          props.command({ editor, range, props });
        },
        items: ({ query }) => {
          const allItems: CommandItemProps[] = [
            {
              title: "Text",
              attrs: {
                "data-test-id": "insert-text",
              },
              icon: Text,
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setNode("paragraph")
                  .run();
              },
            },
            {
              title: "Heading 1",
              attrs: {
                "data-test-id": "insert-heading1",
              },
              icon: Heading1,
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setNode("heading", { level: 1 })
                  .run();
              },
            },
            {
              title: "Heading 2",
              icon: Heading2,
              attrs: {
                "data-test-id": "insert-heading2",
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setNode("heading", { level: 2 })
                  .run();
              },
            },
            {
              title: "Heading 3",
              icon: Heading3,
              attrs: {
                "data-test-id": "insert-heading3",
              },
              command: ({ editor }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setNode("heading", { level: 3 })
                  .run();
              },
            },
            {
              title: "Quote",
              icon: Quote,
              attrs: {
                "data-test-id": "insert-quote",
              },
              command: ({ editor, range }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setBlockquote()
                  .run();
              },
            },
            {
              title: "Bullet List",
              icon: List,
              attrs: {
                "data-test-id": "insert-bullet-list",
              },
              command: ({ editor, range }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .toggleBulletList()
                  .run();
              },
            },
            {
              title: "Numbered List",
              icon: ListOrdered,
              attrs: {
                "data-test-id": "insert-ordered-list",
              },
              command: ({ editor, range }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .toggleOrderedList()
                  .run();
              },
            },
            {
              title: "Code Block",
              icon: Code,
              attrs: {
                "data-test-id": "insert-code",
              },
              command: ({ editor, range }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setCodeBlock()
                  .run();
              },
            },
            /* {
              title: "Callout",
              icon: Text,
              attrs: {
                "data-test-id": "insert-callout",
              },
              command: ({ editor, range }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .setCallout()
                  .run();
              },
            }, */
            /* {
              title: "Image",
              icon: Text,
              attrs: {
                "data-test-id": "insert-image",
              },
              command: ({ editor, range }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .insertContentAt(from, { type: "imagePlaceholder" })
                  .run();
              },
            }, */
            /* {
              title: "Video",
              icon: Text,
              attrs: {
                "data-test-id": "insert-video",
              },
              command: ({ editor, range }) => {
                const selection = editor.view.state.selection;
                const from = selection.$from.posAtIndex(0);
                const to = selection.$from.posAtIndex(1);
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from, to })
                  .insertContentAt(from, { type: "videoPlaceholder" })
                  .run();
              },
            }, */
          ];

          if (query) {
            query = query.toLowerCase().trim();

            if (["1", "2", "3"].includes(query)) {
              return allItems.filter((item) =>
                item.title.endsWith("Heading " + query)
              );
            }

            if (query.startsWith("heading")) {
              const number = query.replace("heading", "").trim();
              if (number) {
                return allItems.filter((item) =>
                  item.title.toLowerCase().endsWith(number)
                );
              }
              1;
              return allItems.filter((item) =>
                item.title.toLowerCase().startsWith(query)
              );
            }

            return allItems.filter((item) =>
              item.title.toLowerCase().includes(query)
            );
          }

          return allItems;
        },
        startOfLine: true,
        allow: ({ state, range, editor }) => {
          const node = state.selection.$from.node();
          if (!node) return false;
          return node.textBetween(0, 1) === "/";
        },
        render: () => {
          let component: ReactRenderer<CommandsView, any>, popup: Instance<any>;
          return {
            onStart: (props) => {
              component = new ReactRenderer(CommandsView, {
                props,
                editor: props.editor,
              });
              popup = tippy(props.editor.options.element, {
                getReferenceClientRect:
                  props.clientRect as GetReferenceClientRect,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              });
            },
            onUpdate: (props) => {
              component.updateProps(props);
              popup.setProps({
                getReferenceClientRect: props.clientRect,
              });
            },
            onKeyDown: ({ event }) => {
              if (event.key === "Escape") {
                popup.hide();
                return true;
              }
              if (component.ref)
                return component.ref.onKeyDown(event as KeyboardEvent);
              else return true;
            },
            onExit: () => {
              component.destroy();
              popup.destroy();
            },
          };
        },
      }),
    ];
  },
});

export default CommandsPlugin;

/* items: ({ query }) => {
          return (
            [
              {
                title: "Heading 1",
                attrs: {
                  "data-test-id": "insert-heading1",
                },
                icon: Heading1,
                command: ({ editor }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .setNode("heading", { level: 1 })
                    .run();
                },
              },
              {
                title: "Heading 2",
                icon: Heading2,
                attrs: {
                  "data-test-id": "insert-heading2",
                },
                command: ({ editor }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .setNode("heading", { level: 2 })
                    .run();
                },
              },
              {
                title: "Heading 3",
                icon: Heading3,
                attrs: {
                  "data-test-id": "insert-heading3",
                },
                command: ({ editor }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .setNode("heading", { level: 3 })
                    .run();
                },
              },
              {
                title: "Quote",
                icon: Text,
                attrs: {
                  "data-test-id": "insert-quote",
                },
                command: ({ editor, range }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .setBlockquote()
                    .run();
                },
              },
              {
                title: "Bullet List",
                icon: List,
                attrs: {
                  "data-test-id": "insert-bullet-list",
                },
                command: ({ editor, range }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .toggleBulletList()
                    .run();
                },
              },
              {
                title: "Numbered List",
                icon: ListOrdered,
                attrs: {
                  "data-test-id": "insert-ordered-list",
                },
                command: ({ editor, range }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .toggleOrderedList()
                    .run();
                },
              },
              {
                title: "Code Block",
                icon: Text,
                attrs: {
                  "data-test-id": "insert-code",
                },
                command: ({ editor, range }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .setCodeBlock()
                    .run();
                },
              },
              {
                title: "Callout",
                icon: Text,
                attrs: {
                  "data-test-id": "insert-callout",
                },
                command: ({ editor, range }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .setCallout()
                    .run();
                },
              },
              {
                title: "Image",
                icon: Text,
                attrs: {
                  "data-test-id": "insert-image",
                },
                command: ({ editor, range }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .insertContentAt(from, { type: "imagePlaceholder" })
                    .run();
                },
              },
              {
                title: "Video",
                icon: Text,
                attrs: {
                  "data-test-id": "insert-video",
                },
                command: ({ editor, range }) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .insertContentAt(from, { type: "videoPlaceholder" })
                    .run();
                },
              },
            ] as CommandProps[]
          )
            .filter((item) => {
              return item.title.toLowerCase().startsWith(query.toLowerCase());
            })
            .slice(0, 10);
        }, */
