// import { memo } from "react";
// import { Handle, Position, NodeResizeControl, NodeResizer } from "reactflow";
// import { Scaling } from "lucide-react";

// const controlStyle = {
//   background: "transparent",
//   border: "red",
// };

// const NodeResizerComponent = ({ data, selected }) => {
//   return (
//     <div
//     //   style={{
//     //     background: "#fff",
//     //     fontSize: 12,
//     //     border: "1px solid black",
//     //     padding: 5,
//     //     borderRadius: 15,
//     //     height: 100,
//     //   }}
//     >
//       <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50} >
//         <Scaling
//         style={{
//             position: "absolute",
//             right: 5,
//             bottom: 5,
//         }}
//         />
//       </NodeResizeControl>
//       <Handle type="target" position={Position.Left} />
//       <div style={{ padding: 10 }}>{data.job}</div>
//       <Handle type="source" position={Position.Right} />
//     </div>
//   );
// };

// export default memo(NodeResizerComponent);

// import { memo } from 'react';
// import { Handle, Position, NodeResizeControl } from 'reactflow';

// const controlStyle = {
//   background: 'transparent',
//   border: 'none',
// };

// const NodeResizerComponent = ({ data }) => {
//   return (
//     <>
//       <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
//         <ResizeIcon />
//       </NodeResizeControl>

//       <Handle type="target" position={Position.Left} />
//       <div>{data.job}</div>
//       <Handle type="source" position={Position.Right} />
//     </>
//   );
// };

// function ResizeIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       strokeWidth="2"
//       stroke="#ff0071"
//       fill="none"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       style={{ position: 'absolute', right: 5, bottom: 5 }}
//     >
//       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//       <polyline points="16 20 20 20 20 16" />
//       <line x1="14" y1="14" x2="20" y2="20" />
//       <polyline points="8 4 4 4 4 8" />
//       <line x1="4" y1="4" x2="10" y2="10" />
//     </svg>
//   );
// }

// export default memo(NodeResizerComponent);

import React, { memo, useState, useEffect } from "react";
import { Handle, Position, NodeResizer, NodeProps, NodeResizeControl } from "reactflow";

import MainEditor from "@/mainEditor";
import useSelectedNodeStore from "@/zustand/selectedNodeStore"
import { Scaling } from 'lucide-react';


const NodeResizerComponent = (props: NodeProps) => {
  const { id, data, selected } = props;

  const [dimensions, setDimensions] = useState({ width: 400, height: 800 });
  const [isNodeClicked, setIsNodeClicked] = useState(false);
  // const [thisNodeClicked, setThisNodeClicked] = useState(false)

  // zustand state management
  const isNodeSelected = useSelectedNodeStore(state => state.isNodeSelected);
  const setIsNodeSelected = useSelectedNodeStore(state => state.setIsNodeSelected);
  const nodeId = useSelectedNodeStore(state => state.id)
  const setNodeId = useSelectedNodeStore(state => state.setId)
  const nodeHeight = useSelectedNodeStore(state => state.height)
  const nodeWidth = useSelectedNodeStore(state => state.width)

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
    setDimensions({ width: newWidth + 10, height: newHeight });
  };

  // Modified handler for editor click
  const handleEditorClick = (e) => {
    console.log("node was clicked")
    console.log("props", props)
    
    console.log("nodeProps")
    console.log("state of isNodeSelected", isNodeSelected)

    setIsNodeClicked(true); // Toggle the clicked state
    // setThisNodeClicked(true)
    // Additional logic if needed
  };

  // onMouseDown handler
  const handleMouseDown = () => {
    console.log("inside handleMouseDown")
    console.log("isNodeSelected", isNodeSelected)
    setIsNodeSelected(true)
    setNodeId(props.id)
  }

  useEffect(() => {
    // Logic to execute when nodeId changes
    console.log("Node ID changed to:", nodeId);

    // You can add additional logic here that should run when nodeId changes.
  }, [nodeId]); // Dependency array with nodeId+

  useEffect(() => {
    if (nodeId == id) {
      console.log("nodeId checker", nodeId)
      console.log("nodeHeight", nodeHeight)
      console.log("nodeWidth", nodeWidth)
      if (nodeHeight != 0 && nodeWidth != 0) {
        setDimensions({ height: nodeHeight, width: 400})
      }      
    }
  }, [nodeId, nodeHeight, nodeWidth])

  // Example items for the overflow div
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
 
  return (
    <>
      <div
        style={{
          display: "flex",
          width: dimensions.width,
          height: dimensions.height,
          border: "1px solid #ddd",
          position: "relative",
          flexDirection:"column"
          // overflow: "auto"
        }}
      >
        <button
          onClick={toggleSize}
          style={{ position: "relative", top: 5, right: 5 }}
        >
          Toggle Size Resizable
        </button> 
        {/* <NodeResizer
          color="#ff0071"
          isVisible={selected}
          minWidth={100}
          minHeight={80}
          maxWidth={1000}
          maxHeight={1000}
          onResizeStart={handleResizeStart}
          onResize={handleResize}
          onResizeEnd={handleResizeEnd}    
        /> */}

        {/* <NodeResizeControl minWidth={100} minHeight={100}>
            <Scaling></Scaling>
        </NodeResizeControl> */}
        
        {/* <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} /> */}

        {/* <div
          style={{
            height: '200px', // Fixed height
            width: '100%', // Full width of the parent container
            overflowY: 'auto', // Vertical scroll
            marginTop: '10px', // Optional spacing from the previous element
            padding: '10px',
            border: '1px solid #ccc', // Styling for visibility
          }}
        >
          {items.map((item, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              {item}
            </div>
          ))}
        </div> */}
        <div className="overflow-y-auto mt-2 p-2 border border-gray-200 flex-grow w-full nodrag">
          {/* {items.map((item, index) => (
            <div key={index} className="mb-2 p-4 bg-gray-100 border border-gray-300 rounded shadow">
              {item}
            </div>
          ))} */}
          <MainEditor nodeProps={props}></MainEditor>
        </div>
        {/* <div onClick={handleEditorClick} onMouseDown={() => setIsNodeSelected(true)} className={isNodeSelected ? "nodrag" : ""}> */}
        {/* <div onClick={handleEditorClick} onMouseDown={handleMouseDown} className={isNodeSelected ? "nodrag" : ""} style={{cursor: "text"}}> */}
        {/* <div onClick={handleEditorClick} onMouseDown={handleMouseDown} className="nodrag"> */}
          {/* <MainEditor nodeProps={props}></MainEditor>
        </div> */}
      </div>
    </>
  );
};

export default memo(NodeResizerComponent);
