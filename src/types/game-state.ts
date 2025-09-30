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

  enterDeath: (reason: GameOverReason) => void;
  applyDamage: (amount: number) => void;
  resetHp: () => void;

  restartGame: () => void;
  resetGame: () => void;
  clearGame: () => void;
  gameOver: (reason: GameOverReason) => void;
  tick: () => void;
};

export type { GameStatus, GameState, GameOverReason };
