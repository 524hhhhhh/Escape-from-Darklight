type GamePhase = "start" | "playing" | "cleared" | "gameover";

type GameState = {
  phase: GamePhase;
  runId: number;
  setGameState: (phase: GamePhase) => void;
  restart: () => void;
};

export type { GamePhase, GameState };
