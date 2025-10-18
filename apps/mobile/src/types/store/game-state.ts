import { MapJson } from "@/lib/validator/map-schema";

type GameOverReason = "timeout" | "hp";

type GameStatus =
  | { type: "start" }
  | { type: "playing"; time: number }
  | { type: "cleared" }
  | { type: "death"; reason: GameOverReason }
  | { type: "gameover"; reason: GameOverReason };

type GameState = {
  runId: number;
  status: GameStatus;
  hp: number;
  maxHp: number;

  currentMapJson: MapJson | undefined;

  enterDeath: (reason: GameOverReason) => void;
  applyDamage: (amount: number) => void;
  resetHp: () => void;

  restartGame: (mapJson?: MapJson) => void;
  resetGame: () => void;
  clearGame: () => void;
  gameOver: (reason: GameOverReason) => void;
  tick: () => void;
};

export type { GameStatus, GameState, GameOverReason };
