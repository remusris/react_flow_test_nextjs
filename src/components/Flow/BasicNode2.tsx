import React, { useCallback, useRef, useState, useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Node,
  Edge,
  Connection,
  useReactFlow,
  ReactFlowProvider,
  SelectionMode,
  useStore,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode2";

// Specify types for your custom node data
interface CustomNodeData {
  name: string;
  job: string;
  emoji: string;
}

// Define node types
const nodeTypes = {
  custom: CustomNode,
};

// Selector function to determine if any nodes are selected
const selectedNodesSelector = (state) =>
  Array.from(state.nodeInternals.values()).some((node) =>
    state.selectedElements?.includes(node)
  );

// Initialize nodes with types
const initNodes: Node<CustomNodeData>[] = [
  // ... your nodes here
  {
    id: "1",
    type: "custom",
    data: { name: "Jane Doe", job: "CEO", emoji: "😎" },
    position: { x: 0, y: 50 },
  },
  {
    id: "2",
    type: "custom",
    data: { name: "Tyler Weary", job: "Designer", emoji: "🤓" },

    position: { x: -200, y: 200 },
  },
  {
    id: "3",
    type: "custom",
    data: { name: "Kristi Price", job: "Developer", emoji: "🤩" },
    position: { x: 200, y: 200 },
  },
];

// Initialize edges with types
const initEdges: Edge[] = [
  // ... your edges here
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
  },
];

const Flow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();
  const { setViewport, setCenter, deleteElements } = useReactFlow();

  const [isNodeSelected, setIsNodeSelected] = useState(false);

  const [selectedNodeState, setSelectedNodeState] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState();

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Function to handle pane click
  const handlePaneClick = (event) => {
    console.log("pane was clicked");

    console.log("isNodeSelected", isNodeSelected)

    // Check if a node is selected, if so, return early
    if (isNodeSelected) {
        console.log("Node is selected, not creating a new node.");
        setIsNodeSelected(false)
        return;
      }

    if (reactFlowInstance && reactFlowWrapper.current) {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `node-${Date.now()}`,
        type: "custom", // Set to 'custom' to use your custom node type
        position,
        data: {
          name: "New Node",
          job: "New Role",
          emoji: "🌟", // Example emoji, change as needed
        },
      };

      setNodes((nds) => nds.concat(newNode));
    }
  };

  /* const handleNodeClick = (event, node) => {
    setViewport({
      x: node.position.x - window.innerWidth / 2 + node.__rf.width / 2,
      y: node.position.y - window.innerHeight / 2 + node.__rf.height / 2,
      zoom: 1.5, // Adjust zoom level as needed
    });
  }; */

  const handleNodeClick = (event, node) => {
    // Log the current position of the node

    /* console.log(`Node position: x=${node.position.x}, y=${node.position.y}`);

    console.log(`node`, node);

    setViewport({
        x: node.position.x,
        y: node.position.y,
        zoom: 2
    }) */

    setCenter(node.position.x, node.position.y);

    // Calculate the center of the viewport
    // This assumes the node's position is at its top-left corner
    const viewportX = node.position.x - window.innerWidth / 2;
    const viewportY = node.position.y - window.innerHeight / 2;

    /* setViewport({
        x: viewportX,
        y: viewportY,
        zoom: 2 // Set the desired zoom level
    }); */

    // Set the viewport to focus on the node, if needed
    // setViewport({
    //   x: node.position.x - window.innerWidth / 2 + node.__rf.width / 2,
    //   y: node.position.y - window.innerHeight / 2 + node.__rf.height / 2,
    //   zoom: 1.5, // Adjust zoom level as needed
    // });
  };

  const newPaneClick = () => {
    console.log("pane clicked");
  };

  const panOnDrag = [1, 2];

  /* const onSelectionChange = (elements) => {
    console.log('Selected elements:', elements);

    if (elements.nodes > 0) {
        setSelectedNodeState(true)
        setSelectedNodes(elements.nodes)
        console.log("selectedNodes", selectedNodes)
    } else {
        setSelectedNodeState(false)
    }
  }; */

  const onSelectionChange = useCallback((elements) => {
    console.log("onSelectionChange")
    console.log("elements", elements)
    // Check if any node is selected
    const hasSelectedNodes = elements.nodes && elements.nodes.length > 0;
    

    console.log(isNodeSelected)

    if (elements.nodes && elements.nodes.length > 0) {
        setIsNodeSelected(true);
    }
  }, []);

  const onSelectionContextMenu = (elements) => {
    console.log("elements.target", elements.target);
    elements.preventDefault();
  };

  useEffect(() => {
    console.log("selectedNodes", selectedNodes);
  }, [selectedNodes, setSelectedNodes]);

  return (
    <div ref={reactFlowWrapper} style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-white"
        onPaneClick={handlePaneClick}
        // onNodeClick={handleNodeClick}
        selectionOnDrag
        selectionMode={SelectionMode.Partial}
        panOnScroll
        panOnDrag={panOnDrag}
        onSelectionChange={onSelectionChange}
        deleteKeyCode={["Delete", "Backspace"]}
        onSelectionContextMenu={onSelectionContextMenu}
      >
        <MiniMap />
        <Controls />

        {isNodeSelected && (
          <button style={{ position: "absolute", right: 20, top: 20 }}>
            Button Visible When Node Selected
          </button>
        )}
      </ReactFlow>
    </div>
  );
};

// Create a new component that wraps Flow with ReactFlowProvider
const FlowWithProvider = () => {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
};

export default FlowWithProvider;


// Use the selector with useStore
  //   const isNodeSelected = useStore(selectedNodesSelector);

  // Function to handle pane click
  /* const handlePaneClick = (event) => {
    console.log("new pane click")

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
      console.log("nodes", nodes)
    }
  };
 */