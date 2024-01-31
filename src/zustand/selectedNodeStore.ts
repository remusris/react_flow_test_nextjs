import { create } from 'zustand';

interface NodeSelectionState {
  isNodeSelected: boolean;
  id: string;
  width: number;
  height: number;
  setIsNodeSelected: (isSelected: boolean) => void;
  setId: (id: string) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
}

const useSelectedNodeStore = create<NodeSelectionState>((set) => ({
  isNodeSelected: false,
  id: "", // Initialize the ID
  width: 0,
  height: 0,
  setIsNodeSelected: (isSelected: boolean) => set({ isNodeSelected: isSelected }),
  setId: (id: string) => set({ id }), // Function to update the ID
  setWidth: (width: number) => set({ width }),
  setHeight: (height: number) => set({ height }),
}));

export default useSelectedNodeStore;