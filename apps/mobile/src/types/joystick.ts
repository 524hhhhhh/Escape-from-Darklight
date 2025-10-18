type StickOffset = { x: number; y: number };

type StickVector = StickOffset & {
  strength: number;
  angle: number;
};

export type { StickVector, StickOffset };
