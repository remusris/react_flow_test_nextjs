import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Handle, Position } from "reactflow";

const TipTapNode = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start typing here...</p>",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="nodrag">
      <Handle type="target" position={Position.Top} />
      <EditorContent editor={editor} onClick={(e) => e.stopPropagation()} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default TipTapNode;
