import { create } from 'zustand';

interface NodeSelectionState {
    isNodeSelected: boolean;
    setIsNodeSelected: (isSelected: boolean) => void;
  }

const useSelectedNodeStore = create<NodeSelectionState>((set) => ({
  isNodeSelected: false,
  setIsNodeSelected: (isSelected: boolean) => set({ isNodeSelected: isSelected }),
}));

export default useSelectedNodeStore;