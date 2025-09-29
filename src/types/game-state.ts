type GameOverReason = "timeout" | "death";

type GameStatus =
  | { type: "start" }
  | { type: "playing"; time: number }
  | { type: "cleared" }
  | { type: "gameover"; reason: GameOverReason };

type GameState = {
  runId: number;
  status: GameStatus;

  restartGame: () => void;
  resetGame: () => void;
  clearGame: () => void;
  gameOver: (reason: GameOverReason) => void;
  tick: () => void;
};

export type { GameStatus, GameState, GameOverReason };
