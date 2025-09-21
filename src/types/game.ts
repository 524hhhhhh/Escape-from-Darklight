type GamePhase = "start" | "playing" | "cleared" | "gameover";

type GameState = {
  phase: GamePhase;
  setGameState: (phase: GamePhase) => void;
};

export { GamePhase, GameState };
