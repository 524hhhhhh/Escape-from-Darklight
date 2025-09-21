import { create } from "zustand";
import { GameState } from "../types/game";

export const useGameStore = create<GameState>((set) => ({
  phase: "start",
  setGameState: (phase) => set({ phase }),
}));
