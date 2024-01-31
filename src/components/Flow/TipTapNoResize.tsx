import React, { memo, useState, useEffect } from "react";
import { Handle, Position, NodeResizer, NodeProps } from "reactflow";
import MainEditor from "@/mainEditor";
import useSelectedNodeStore from "@/zustand/selectedNodeStore";

const TipTapNoResize = (props: NodeProps) => {
  const { id, data, selected } = props;

  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const [isNodeClicked, setIsNodeClicked] = useState(false);
  // const [thisNodeClicked, setThisNodeClicked] = useState(false)

  // zustand state management
  const isNodeSelected = useSelectedNodeStore((state) => state.isNodeSelected);
  const setIsNodeSelected = useSelectedNodeStore(
    (state) => state.setIsNodeSelected
  );
  const nodeId = useSelectedNodeStore((state) => state.id);
  const setNodeId = useSelectedNodeStore((state) => state.setId);
  const nodeHeight = useSelectedNodeStore((state) => state.height);
  const nodeWidth = useSelectedNodeStore((state) => state.width);

  // Handler for the start of the resizing action
  const handleResizeStart = (event, params) => {
    console.log("Resizing started", params);
  };

  // Handler for resizing action
  const handleResize = (event, params) => {
    setDimensions({ width: params.width, height: params.height });
  };

  // Handler for the end of the resizing action
  const handleResizeEnd = (event, params) => {
    console.log("Resizing ended", params);
  };

  // Handler for the button click to toggle size
  const toggleSize = () => {
    const newWidth = dimensions.width === 400 ? 800 : 400;
    const newHeight = dimensions.height === 320 ? 800 : 320;
    setDimensions({ width: newWidth, height: newHeight });
  };

  // Modified handler for editor click
  const handleEditorClick = (e) => {
    console.log("node was clicked");
    console.log("props", props);

    console.log("nodeProps");
    console.log("state of isNodeSelected", isNodeSelected);

    setIsNodeClicked(true); // Toggle the clicked state
    // setThisNodeClicked(true)
    // Additional logic if needed
  };

  // onMouseDown handler
  const handleMouseDown = () => {
    console.log("inside handleMouseDown");
    console.log("isNodeSelected", isNodeSelected);
    setIsNodeSelected(true);
    setNodeId(props.id);
  };

  useEffect(() => {
    // Logic to execute when nodeId changes
    console.log("Node ID changed to:", nodeId);

    // You can add additional logic here that should run when nodeId changes.
  }, [nodeId]); // Dependency array with nodeId+

  useEffect(() => {
    if (nodeId == id) {
      console.log("nodeId checker", nodeId);
      console.log("nodeHeight", nodeHeight);
      console.log("nodeWidth", nodeWidth);
      if (nodeHeight != 0 && nodeWidth != 0) {
        setDimensions({ height: nodeHeight + 15, width: 400 });
      }
    }
  }, [nodeId, nodeHeight, nodeWidth]);

  return (
    <>
      <div
        style={{
          display: "flex",
          width: dimensions.width,
          height: dimensions.height,
          alignItems: "center",
          //border: "1px solid #ddd",
          border: isNodeSelected ? "1px solid blue" : "1px solid #ddd",
          position: "relative",
          overflowX: "hidden", // Prevent horizontal scrolling
          overflowY: "auto", // Allow vertical scrolling
          // overflow: "auto"
        }}
      >
        {/* <button
          onClick={toggleSize}
          style={{ position: "absolute", top: 5, right: 5 }}
        >
          Toggle Size Resizable
        </button> */}
        {/* <div onClick={handleEditorClick} onMouseDown={() => setIsNodeSelected(true)} className={isNodeSelected ? "nodrag" : ""}> */}
        <div
          onClick={handleEditorClick}
          onMouseDown={handleMouseDown}
          className={isNodeSelected ? "nodrag" : ""}
          style={{ cursor: "text" }}
        >
          {/* <div onClick={handleEditorClick} onMouseDown={handleMouseDown} className="nodrag"> */}
          <MainEditor nodeProps={props}></MainEditor>
        </div>
      </div>
    </>
  );
};

export default memo(TipTapNoResize);
