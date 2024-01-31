import {
  DragHandleDots2Icon,
  PlusIcon,
  CaretRightIcon,
} from "@radix-ui/react-icons";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
// import { useSubnodeContext } from "@/SubNodeViewContext/SubNodeViewContext";
import { useState, useEffect } from "react";
// import { useHoverBlocksContext } from "@/HoverBlockContext/HoverNodeContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash2, Focus, Fullscreen  } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSelectedNodeStore from "@/zustand/selectedNodeStore"
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage.external";

// Define the RootBlockComponent, which will serve as a custom Node View in the Tiptap editor
const RootBlockComponent: React.FC<NodeViewProps> = ({
  node,
  getPos,
  editor,
}) => {
  // send node block to context
  /* const { updateSelectedNodeContent, selectedNodeContent } =
    useSubnodeContext(); */

  // send node block to context
  // const { blocks, setBlocks } = useHoverBlocksContext();

  const [nodeContentType, setNodeContentType] = useState<string | null>(null);

  // testing for when trying to send over a node to the right screen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === "1") {
        console.log("Alt + 1 pressed", node.toJSON().content);
        console.log("node", node);
        console.log("node", node.attrs);
        // Add additional logic here if needed
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    let nodeObject = node.toJSON();

    if (nodeObject.content?.[0]?.type === "heading") {
      if (nodeObject.content?.[0]?.attrs?.level === 1) {
        setNodeContentType("heading1");
      }
      if (nodeObject.content?.[0]?.attrs?.level === 2) {
        setNodeContentType("heading2");
      }
      if (nodeObject.content?.[0]?.attrs?.level === 3) {
        setNodeContentType("heading3");
      }
    } else {
      setNodeContentType("other");
    }

    let nodeContent = nodeObject.content?.[0]?.type;

    // setNodeContentType(nodeContent);
    console.log("nodeObject", nodeObject);
    console.log("nodeContent", nodeContent);
  }, [node]);

  // Function to send the current node content to the context
  // old version
  /* const handleSendToContext = () => {
    const nodeContent = node.toJSON();
    const nodeContentHTML = node.toString();

    console.log("nodeContent", nodeContent);
    nodeContent.type = "rootblockold";

    updateSelectedNodeContent(null);
    updateSelectedNodeContent(nodeContent);
  }; */

  // new send to context
  /* const handleSendToContextNew = () => {
    const nodeContent = node.toJSON();
    const nodeContentHTML = node.toString();

    console.log("nodeContent", nodeContent);
    nodeContent.type = "primarysubnode";

    // setBlocks(nodeContent);
    // Append the new nodeContent to the existing blocks array
    setBlocks((prevBlocks) => [...prevBlocks, nodeContent]);
  };
 */
  // Handle the event when the button is pressed down
  const handleButtonPress = () => {
    console.log("handleButtonPress");
    console.log("mouse button node information", node.toJSON());
  };

  // Handle the event when the button is released
  const handleButtonRelease = () => {};

  // Function to create a new node immediately after the current node
  const createNodeAfter = () => {
    // Calculate the position right after the current node
    const pos = getPos() + node.nodeSize;

    // Use the editor's command to insert a new "rootblock" node at the calculated position
    editor
      .chain()
      .insertContentAt(pos, {
        type: "rootblock",
        content: [
          {
            type: "paragraph",
          },
        ],
      })
      .focus(pos + 3) // Focus on the new block (you might need to adjust the position based on your exact requirements)
      .run();
  };

  const renderButtonsContainer = (topPosition: string) => (
    <div
      className={`absolute -left-4 ${topPosition} transform -translate-x-full flex w-12 gap-1 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100`}
      aria-label="left-menu"
    >
      <button type="button" onClick={createNodeAfter} className="">
        <PlusIcon className="h-5 w-5" />
      </button>
      <button
        type="button"
        // onClick={handleSendToContextNew}
        className="button-class"
      >
        <CaretRightIcon className="h-5 w-5" />
      </button>
      <Popover>
        <PopoverTrigger asChild>
          <button
            draggable
            data-drag-handle
            className="cursor-grab"
            onMouseDown={handleButtonPress}
            onMouseUp={handleButtonRelease}
            onTouchStart={handleButtonPress}
            onTouchEnd={handleButtonRelease}
          >
            <DragHandleDots2Icon className="h-5 w-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0" align="start">
          <Button variant="ghost" className="w-full">
            <div className="flex justify-between items-center w-full ">
              <p>Delete</p>
              <Trash2 size={16}></Trash2>
            </div>
          </Button>
          <Button variant="ghost" className="w-full">
            <div className="flex justify-between items-center w-full ">
              <p>Focus</p>
              <Fullscreen size={16}></Fullscreen>
            </div>
          </Button>
          
          
          
        </PopoverContent>
      </Popover>
    </div>
  );

  const getTopPosition = () => {
    switch (nodeContentType) {
      case "heading1":
        return "top-5";
      case "heading2":
        return "top-4";
      case "heading3":
        return "top-3.5";
      default:
        return "top-3";
    }
  };

  // Render the custom node view
  return (
    <NodeViewWrapper
      as="div"
      className="group relative flex w-full gap-2"
    >
      <div className="relative w-full max-w-4xl">
        {nodeContentType && renderButtonsContainer(getTopPosition())}
        <NodeViewContent onClick={() => console.log("click inside node view component")} className="w-full" />
      </div>
    </NodeViewWrapper>
  );
};

export default RootBlockComponent;
