import { create } from "zustand";

interface TagStore {
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  resetSelectedTag: () => void;
  shouldScrollOnSelect: boolean;
  setShouldScrollOnSelect: (shouldScroll: boolean) => void;
}

export const useTagStore = create<TagStore>((set) => ({
  selectedTag: null,
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  resetSelectedTag: () => set({ selectedTag: null }),
  shouldScrollOnSelect: false,
  setShouldScrollOnSelect: (shouldScroll) =>
    set({ shouldScrollOnSelect: shouldScroll }),
}));
