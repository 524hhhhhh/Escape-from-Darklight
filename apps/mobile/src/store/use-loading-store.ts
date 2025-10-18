import { create } from "zustand";
import { LoadingState } from "@/types/store/loading-state";

export const useLoadingStore = create<LoadingState>((set) => ({
  loadingInfo: null,
  isVisible: false,

  show: (options) => {
    const id = Math.random().toString(36).slice(2);

    set({
      loadingInfo: {
        id,
        messages: options.messages,
      },
      isVisible: true,
    });

    return id;
  },

  hide: () => set({ loadingInfo: null, isVisible: false }),
}));
