import { GameState } from "@/types/game-state";

export const timeFormat = (state: GameState) => {
  if (state.status.type !== "playing") {
    return null;
  }

  const time = Math.max(0, Math.floor(state.status.time));
  const minute = Math.floor(time / 60);
  const second = String(time % 60).padStart(2, "0");
  return `${minute}:${second}`;
};
