import React, { memo, useState } from "react";
import { Handle, NodeProps, Position, NodeResizer } from "reactflow";
import MainEditor from "@/mainEditor";

interface CustomNodeData {
  name: string;
  job: string;
  emoji: string;
}

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data }) => {
  // State to manage the click status
  const [isClicked, setIsClicked] = useState(false);

  // Function to toggle the size and click status of the node
  const toggleSize = (e) => {
    e.stopPropagation();
    setIsClicked(!isClicked); // Toggle the click status

    console.log("data from custom node component", data);
  };

  // Determine the size based on the click status
  const size = isClicked
    ? { width: "w-full", height: "h-96" }
    : { width: "w-full", height: "h-24" };

  return (
    <div
      className={`${size.width} ${size.height} px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400`}
    >
      <div className="flex">
        <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
          {data.emoji}
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.name}</div>
          <div className="text-gray-500">{data.job}</div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500"
      />

      <button
        onClick={toggleSize}
        className="mt-2 py-1 px-3 bg-blue-500 text-white rounded-md"
      >
        Toggle Size
      </button>
      {/* <div className="mt-4 flex-grow">
        <MainEditor />
      </div> */}
    </div>
  );
};

export default memo(CustomNode);

/* const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex">
        <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
          {data.emoji}
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.name}</div>
          <div className="text-gray-500">{data.job}</div>
        </div>
      </div>

      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
  );
}

export default memo(CustomNode); */
