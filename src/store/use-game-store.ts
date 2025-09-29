import { create } from "zustand";
import type { GameState, GameOverReason } from "@/types/game-state";
import { DEFAULT_LIMIT } from "@/constants/time";

export const useGameStore = create<GameState>((set) => ({
  runId: 0,
  status: { type: "start" },

  restartGame: () =>
    set((state) => ({
      runId: state.runId + 1,
      status: { type: "playing", time: DEFAULT_LIMIT },
    })),

  resetGame: () =>
    set(() => ({
      runId: 0,
      status: { type: "start" },
    })),

  clearGame: () =>
    set(() => ({
      status: { type: "cleared" },
    })),

  gameOver: (reason: GameOverReason) =>
    set(() => ({
      status: { type: "gameover", reason },
    })),

  tick: () =>
    set((state) => {
      if (state.status.type !== "playing") {
        return state;
      }

      const next = Math.max(0, state.status.time - 1);
      if (next === 0) {
        return { status: { type: "gameover", reason: "timeout" } };
      }

      return { status: { type: "playing", time: next } };
    }),
}));
