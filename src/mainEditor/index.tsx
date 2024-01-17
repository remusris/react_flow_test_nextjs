import React, { useEffect } from "react";
import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react";
import Extensions from "./extensions";
import Props from "./props";
import StarterKit from "@tiptap/starter-kit";
import DragAndDrop from "./DragAndDrop";
import defaultContent from "./defaultContent";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaCaretDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
// import { useEditorStateContext } from "@/EditorStateContext/EditorStateContext";

// regular weight icons
const Bold = "/bold.svg";
const Italic = "/italic.svg";
const StrikeThrough = "/strikethrough.svg";
const Underline = "/underline.svg";
const Code = "/code.svg";

// bold weight icons
const BoldActive = "/boldActive.svg";
const ItalicActive = "/italicActive.svg";
const StrikeThroughActive = "/strikethroughActive.svg";
const UnderlineActive = "/underlineActive.svg";
const CodeActive = "/codeActive.svg";

const MainEditor: React.FC = () => {
  const editor = useEditor({
    extensions: Extensions,
    editorProps: Props,
    content: `<div data-type="rootblock">
    <p>Hello, this is a custom document structure!</p>
  </div>`,
    onUpdate: ({ editor }) => {
      console.log("editor", editor.getJSON());
    },
  });

  // add in an editable class
  // editor.setEditable(boolean)

  // get the current editor state
  /* const {
    mainEditor,
    setMainEditor,
    primarySubnodeEditor,
    setPrimarySubnodeEditor,
    secondarySubnodeEditor,
    setSecondarySubnodeEditor,
  } = useEditorStateContext(); */

  /* useEffect(() => {
    console.log("mainEditor state", mainEditor);
    if (mainEditor === false) {
      editor?.setEditable(false);
      console.log("mainEditor is false");
    }

    if (mainEditor === true) {
      editor?.setEditable(true);
      console.log("mainEditor is true");
    }
  }, [mainEditor, editor]); */

  // the mouse up event handler for when out of scope of the Editor Content
  useEffect(() => {
    // Define the mouse-up event handler
    const handleMouseUp = () => {
      console.log("Mouse up event detected");
      // You can add more logic here as needed
      // setMainEditor(true);
    };

    // Attach the event listener to the window object
    window.addEventListener("mouseup", handleMouseUp);

    // Clean up the event listener
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleEditorClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Additional logic if needed
  };

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto">
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex w-[700px]"
        >
          <div className="flex h-8 gap-x-1 rounded-md border bg-card text-card-foreground shadow-sm bg-slate-50">
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center justify-center text-sm py-1 px-2 text-center hover:bg-slate-200">
                  {editor.isActive("codeBlock")
                    ? "Code Block"
                    : editor.isActive("paragraph")
                    ? "Paragraph"
                    : editor.isActive("heading", { level: 1 })
                    ? "H1"
                    : editor.isActive("heading", { level: 2 })
                    ? "H2"
                    : editor.isActive("heading", { level: 3 })
                    ? "H3"
                    : "None"}
                  <FaCaretDown className="ml-2" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-40 flex flex-col py-0 px-0 space-y-0 bg-slate-50">
                {/* <button className="text-left w-full px-3 text-sm bg-slate-50 hover:bg-slate-200"
                  onClick={() => editor.chain().focus().setParagraph().run()}
                >
                  Text
                </button> */}
                <button
                  className="flex items-center justify-between text-left w-full pt-2 pb-1 px-3 text-sm bg-slate-50 hover:bg-slate-200"
                  onClick={() => editor.chain().focus().setParagraph().run()}
                >
                  Text
                  {editor.isActive("paragraph") && (
                    <FaCheck className="mr-2 h-3 w-3" />
                  )}
                </button>
                <button
                  className="flex items-center justify-between text-left w-full py-1 px-3 text-sm bg-slate-50 hover:bg-slate-200"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  H1
                  {editor.isActive("heading", { level: 1 }) && (
                    <FaCheck className="mr-2 h-3 w-3" />
                  )}
                </button>
                <button
                  className="flex items-center justify-between text-left w-full py-1 px-3 text-sm bg-slate-50 hover:bg-slate-200"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  H2
                  {editor.isActive("heading", { level: 2 }) && (
                    <FaCheck className="mr-2 h-3 w-3" />
                  )}
                </button>
                <button
                  className="flex items-center justify-between text-left w-full py-1 px-3 text-sm bg-slate-50 hover:bg-slate-200"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                >
                  H3
                  {editor.isActive("heading", { level: 3 }) && (
                    <FaCheck className="mr-2 h-3 w-3" />
                  )}
                </button>
                <button
                  className="flex items-center justify-between text-left w-full pt-1 pb-2 px-3 text-sm bg-slate-50 hover:bg-slate-200"
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                  Code Block
                  {editor.isActive("codeBlock") && (
                    <FaCheck className="mr-2 h-3 w-3" />
                  )}
                </button>
              </PopoverContent>
            </Popover>
            <Separator
              className="w-[1px] bg-gray-300"
              orientation="vertical"
            ></Separator>

            <button
              className={`bg-slate-50 hover:bg-slate-200 text-white py-2 px-1 flex justify-center items-center`}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Image
                src={editor.isActive("bold") ? BoldActive : Bold}
                alt="Bold"
                width="16"
                height="16"
              />
            </button>
            <button
              className={`bg-slate-50 hover:bg-slate-200 text-white py-2 px-1 flex justify-center items-center`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Image
                src={editor.isActive("italic") ? ItalicActive : Italic}
                alt="Italic"
                width="16"
                height="16"
              />
            </button>
            <button
              className={`bg-slate-50 hover:bg-slate-200 text-white py-2 px-1 flex justify-center items-center`}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <Image
                src={editor.isActive("underline") ? UnderlineActive : Underline}
                alt="Underline"
                width="16"
                height="16"
              />
            </button>
            <button
              className={`bg-slate-50 hover:bg-slate-200 text-white py-2 px-1 flex justify-center items-center`}
              onClick={() => editor.chain().focus().toggleCode().run()}
            >
              <Image
                src={editor.isActive("code") ? CodeActive : Code}
                alt="Code"
                width="16"
                height="16"
              />
            </button>
            <button
              className={`bg-slate-50 hover:bg-slate-200 text-white py-2 px-1 flex justify-center items-center`}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <Image
                src={
                  editor.isActive("strike")
                    ? StrikeThroughActive
                    : StrikeThrough
                }
                alt="StrikeThrough"
                width="16"
                height="16"
              />
            </button>
          </div>
        </BubbleMenu>
      )}
      {/* <button onClick={() => editor?.setEditable(false)}>
        Turn Off Editing
      </button>
      <button onClick={() => editor?.setEditable(true)}>Turn On Editing</button> */}
      <EditorContent onClick={handleEditorClick} editor={editor!} />
    </div>
  );
};

export default MainEditor;