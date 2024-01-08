import { memo } from "react";
import { Handle, NodeProps, Position, NodeResizer } from "reactflow";

const CustomNode = ({
  data,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps) => {
  return (
    <>
      <NodeResizer
        handleClassName="!bg-green-400 !w-2 !h-2"
        lineClassName="!border-green-400"
      />
      <div className="bg-slate-200/80 px-2 py-4 rounded-md text-xs h-full">
        <Handle
          type="target"
          position={targetPosition}
          className="bg-red-500 w-3 h-2 rounded-sm"
        />
        {data?.label}
        <Handle
          type="source"
          position={sourcePosition}
          className="bg-blue-500 w-3 h-2 rounded-sm"
        />
      </div>
    </>
  );
};

CustomNode.displayName = "CustomNode";

export default memo(CustomNode);
