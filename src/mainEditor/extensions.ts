import StarterKit from "@tiptap/starter-kit";
import { Node } from "@tiptap/core";
import RootBlock from "./root-block";
import Keymap from "./keymap";
// import RootBlockOld from "./root-block-old";
// import reactButton from "./reactButton";
// import ReactComponent from "./testExtension";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Dropcursor from "@tiptap/extension-dropcursor";
// import SlashCommand from "../trash/slash-command";
import NodeNavigationExtension from "./NodeNavigationExtension"

// old command menu suggestions
/* import Commands from "./suggestion/commands";
import getSuggestionItems from "./suggestion/items";
import renderItems from "./suggestion/renderItems"; */

import CommandsPlugin from "./slash-commands/commands";

const Document = Node.create({
  name: "doc",
  topNode: true,
  content: "rootblock+",
});

/* const Document = Node.create({
  name: "doc",
  topNode: true,
  content: "(rootblock | rootblockold | reactButton | reactComponent)*", // Updated expression
}); */

const Extensions = [
  Document,
  RootBlock,
  // RootBlockOld,
  Keymap,
  StarterKit.configure({
    document: false,
    dropcursor: false,
  }),
  Underline,
  Strike,
  Dropcursor.configure({ width: 4, color: "#CFE4FF" }),
  // Commands.configure({
  //   suggestion: {
  //     items: getSuggestionItems,
  //     render: renderItems,
  //   },
  // }),
  CommandsPlugin,
];

export default Extensions;
