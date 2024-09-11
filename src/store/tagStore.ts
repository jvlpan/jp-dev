import { create } from "zustand";

interface TagStore {
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  resetSelectedTag: () => void;
}

export const useTagStore = create<TagStore>((set) => ({
  selectedTag: null as string | null,
  setSelectedTag: (tag: string | null) => set({ selectedTag: tag }),
  resetSelectedTag: () => set({ selectedTag: null }),
}));
