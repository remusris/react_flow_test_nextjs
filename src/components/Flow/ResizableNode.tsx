import React, { memo, useState, useEffect } from "react";
import { Handle, Position, NodeResizer, NodeProps, NodeResizeControl } from "reactflow";
import MainEditor from "@/mainEditor";
import useSelectedNodeStore from "@/zustand/selectedNodeStore"


const ResizableNodeSelected = (props: NodeProps) => {
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
 
  return (
    <>
      <div
        style={{
          display: "flex",
          width: dimensions.width,
          height: dimensions.height,
          border: "1px solid #ddd",
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
        <NodeResizeControl>

        </NodeResizeControl>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
        {/* <div onClick={handleEditorClick} onMouseDown={() => setIsNodeSelected(true)} className={isNodeSelected ? "nodrag" : ""}> */}
        <div onClick={handleEditorClick} onMouseDown={handleMouseDown} className={isNodeSelected ? "nodrag" : ""} style={{cursor: "text"}}>
        {/* <div onClick={handleEditorClick} onMouseDown={handleMouseDown} className="nodrag"> */}
          <MainEditor nodeProps={props}></MainEditor>
        </div>
      </div>
    </>
  );
};

export default memo(ResizableNodeSelected);

// onMouseDown={() => setIsNodeSelected(true)}

// const ResizableNodeSelected = ({ data, selected }) => {
//   const [dimensions, setDimensions] = useState({ width: 100, height: 30 });

//   const changeSize = () => {
//     // Example: toggle between two sizes
//     const newWidth = dimensions.width === 100 ? 250 : 100;
//     const newHeight = dimensions.height === 30 ? 400 : 30;
//     setDimensions({ width: newWidth, height: newHeight });
//   };

//   return (
//     <>
//       {/* <div
//         style={{
//           width: dimensions.width,
//           height: dimensions.height,
//           padding: 10,
//           border: '1px solid #ddd',
//           position: 'relative'
//         }}
//       >
//         {data.label}
//         <button onClick={changeSize} style={{ position: 'absolute', top: 5, right: 5 }}>
//           Change Size
//         </button>
//       </div> */}
//       <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} maxWidth={400}/>
//       <Handle type="target" position={Position.Left} />
//       <Handle type="source" position={Position.Right} />
//     </>
//   );
// };

// const ResizableNodeSelected = ({ data, selected }) => {
//     return (
//       <>
//         <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} maxWidth={400}/>
//         <Handle type="target" position={Position.Left} />
//         <div style={{ padding: 10 }}>This is the node</div>
//         <Handle type="source" position={Position.Right} />
//       </>
//     );
//   };

// const ResizableNodeSelected = ({ data, selected }) => {
//     const [dimensions, setDimensions] = useState({ width: 100, height: 30 });

//     const changeSize = () => {
//       // Example: toggle between two sizes
//       const newWidth = dimensions.width === 100 ? 250 : 100;
//       const newHeight = dimensions.height === 30 ? 400 : 30;
//       setDimensions({ width: newWidth, height: newHeight });
//     };

//     return (
//       <>
//         <NodeResizer
//           color="#ff0071"
//           isVisible={selected}
//           style={{ width: dimensions.width, height: dimensions.height }}
//           onResizeEnd={}
//         />
//         <div
//           style={{
//             width: dimensions.width,
//             height: dimensions.height,
//             padding: 10,
//             border: '1px solid #ddd',
//             position: 'relative'
//           }}
//         >
//           This is the node
//           <button onClick={changeSize} style={{ position: 'absolute', top: 5, right: 5 }}>
//             Toggle Size
//           </button>
//         </div>
//         <Handle type="target" position={Position.Left} />
//         <Handle type="source" position={Position.Right} />
//       </>
//     );
//   };

// const ResizableNodeSelected = ({ data, selected }) => {
//     const [dimensions, setDimensions] = useState({ width: 100, height: 100 });

//     // Handler for the start of the resizing action
//     const handleResizeStart = (event, params) => {
//       // Initial setup before resizing begins
//       console.log('Resizing started', params);
//     };

//     // Handler for resizing action
//     const handleResize = (event, params) => {
//       const { width, height } = params;
//       setDimensions({ width, height });
//       console.log('Resizing in progress', params);
//     };

//     // Handler for the end of the resizing action
//     const handleResizeEnd = (event, params) => {
//       // Final adjustments or validations after resizing
//       console.log('Resizing ended', params);
//     };

//     return (
//       <>
//         <NodeResizer
//           color="#ff0071"
//           isVisible={selected}
//           style={{ width: dimensions.width, height: dimensions.height }}
//           minWidth={100}
//           minHeight={30}
//           maxWidth={400}
//           maxHeight={500}
//           onResizeStart={handleResizeStart}
//           onResize={handleResize}
//           onResizeEnd={handleResizeEnd}
//         />
//         <div
//           style={{
//             width: dimensions.width,
//             height: dimensions.height,
//             padding: 10,
//             border: '1px solid #ddd',
//             position: 'relative'
//           }}
//         >
//           This is the node
//           <Handle type="target" position={Position.Left} />
//           <Handle type="source" position={Position.Right} />
//         </div>
//       </>
//     );
//   };