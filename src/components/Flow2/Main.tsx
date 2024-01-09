import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";
import CustomNode from "./CustomNode";

import "reactflow/dist/style.css";
import "./overview.css";

import { useRef, useState } from "react";

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

// const OverviewFlow = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

//   // we are using a bit of a shortcut here to adjust the edge type
//   // this could also be done with a custom edge for example
//   const edgesWithUpdatedTypes = edges.map((edge) => {
//     if (edge.sourceHandle) {
//       const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
//       edge.type = edgeType;
//     }

//     return edge;
//   });

//   return (
//     <ReactFlow
//       nodes={nodes}
//       edges={edgesWithUpdatedTypes}
//       onNodesChange={onNodesChange}
//       onEdgesChange={onEdgesChange}
//       onConnect={onConnect}
//       onInit={onInit}
//       fitView
//       attributionPosition="top-right"
//       nodeTypes={nodeTypes}
//     >
//       <MiniMap style={minimapStyle} zoomable pannable />
//       <Controls />
//       <Background color="#aaa" gap={16} />
//     </ReactFlow>
//   );
// };

const OverviewFlow = () => {
  // States and references
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // const reactFlowInstance = useReactFlow();

  // Callback function for when new connections are made
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Function to add a new node
  const addNewNode = () => {
    // Define the new node
    const newNode = {
      id: `node-${nodes.length + 1}`, // Unique ID for the new node
      type: "default", // Type of the node, can be 'custom' for custom nodes
      position: {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }, // Random position
      data: { label: `Node ${nodes.length + 1}` }, // Label for the node
    };

    // Add the new node to the current nodes
    setNodes((nds) => nds.concat(newNode));
  };

  // Double-click event handler
  const onDoubleClick = useCallback(
    (event) => {
      // Ensure we have the React Flow instance and wrapper reference
      if (reactFlowInstance && reactFlowWrapper.current) {
        // Get the bounding rectangle of the React Flow wrapper
        const reactFlowBounds =
          reactFlowWrapper.current.getBoundingClientRect();

        // Calculate the position of the new node
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        // Create a new node object
        const newNode = {
          id: Date.now().toString(), // Unique ID for the new node
          type: "default", // Type of the node, can be 'custom' for custom nodes
          position, // Position where the node will be placed
          data: { label: "New Node" }, // Data for the node, can be customized
        };

        // Update the nodes state to include the new node
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, setNodes]
  );

  // Function to handle pane click
  const handlePaneClick = (event) => {
    if (reactFlowInstance && reactFlowWrapper.current) {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `node-${Date.now()}`, // Unique ID for the new node
        type: "default", // Type of the node, can be 'custom' for custom nodes
        position, // Position where the node will be placed
        data: {
          label: `New Node at (${position.x.toFixed(0)}, ${position.y.toFixed(
            0
          )})`,
        }, // Data for the node
      };

      setNodes((nds) => nds.concat(newNode));
    }
  };

  // Function to zoom into a specific node
  const zoomIntoNode = (nodeId) => {
    console.log("onNodeClick");

    const node = nodes.find((n) => n.id === nodeId);
    if (node && reactFlowInstance) {
      const { x, y, width, height } =
        reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: node.position.x,
        y: node.position.y,
      });

      // Set the new transform for the React Flow instance
      reactFlowInstance.setTransform({
        x: x + width / 2 - position.x,
        y: y + height / 2 - position.y,
        zoom: 2, // Set the zoom level you want
      });
    }
  };

  // Function to handle node click
  const onNodeClick = (event, node) => {
    console.log("Node clicked:", node);

    // Existing zoom functionality (optional, remove if not needed)
    const { x, y, width, height } =
      reactFlowWrapper.current.getBoundingClientRect();
    const position = reactFlowInstance.project({
      x: node.position.x,
      y: node.position.y,
    });

    reactFlowInstance.setTransform({
      x: x + width / 2 - position.x,
      y: y + height / 2 - position.y,
      zoom: 2, // Set the zoom level you want
    });
  };

  // The React Flow component with event handlers and custom node types
  return (
    <div
      ref={reactFlowWrapper}
      onDoubleClick={onDoubleClick}
      style={{ width: "100%", height: "100%" }}
    >
      <button onClick={addNewNode} style={{ position: "absolute", zIndex: 2 }}>
        Add Node
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={setReactFlowInstance}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="top-right"
        nodeTypes={{ custom: CustomNode }}
        onPaneClick={handlePaneClick}
        onNodeClick={() => {
          console.log("test");
        }}
      >
        <MiniMap style={{ height: 120 }} zoomable pannable />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default OverviewFlow;
