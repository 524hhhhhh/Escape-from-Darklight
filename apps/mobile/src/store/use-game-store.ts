import { create } from "zustand";
import type { GameState, GameOverReason } from "@/types/store/game-state";
import { DEFAULT_LIMIT } from "@/constants/time";
import { PLAYER } from "@/constants/player";

export const useGameStore = create<GameState>((set, get) => ({
  runId: 0,
  status: { type: "start" },

  hp: PLAYER.MAX_HP,
  maxHp: PLAYER.MAX_HP,
  currentMapJson: undefined,

  enterDeath: (reason: GameOverReason) =>
    set(() => ({ status: { type: "death", reason } })),

  applyDamage: (amount) => {
    const { hp, enterDeath } = get();
    const next = Math.max(0, hp - Math.max(0, amount));

    set({ hp: next });

    if (next === 0) {
      enterDeath("hp");
    }
  },

  resetHp: () => {
    const { maxHp } = get();
    set({ hp: maxHp });
  },

  restartGame: (mapJson) =>
    set((state) => ({
      runId: state.runId + 1,
      status: { type: "playing", time: DEFAULT_LIMIT },
      hp: state.maxHp,
      currentMapJson: mapJson ?? state.currentMapJson,
    })),

  resetGame: () =>
    set((state) => ({
      runId: 0,
      status: { type: "start" },
      hp: state.maxHp,
      currentMapJson: undefined,
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
        return { status: { type: "death", reason: "timeout" } };
      }

      return { status: { type: "playing", time: next } };
    }),
}));
