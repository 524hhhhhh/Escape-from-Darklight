import { create } from "zustand";
import { GameState } from "@/types/game-state";

export const useGameStore = create<GameState>((set) => ({
  phase: "start",
  runId: 0,
  setGameState: (phase) => set({ phase }),
  restart: () => set((state) => ({ phase: "playing", runId: state.runId + 1 })),
}));
