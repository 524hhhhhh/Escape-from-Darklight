import { FacingDirection } from "@/types/sprite";

export const vectorToDirection = (dx: number, dy: number): FacingDirection => {
  const degree = (Math.atan2(dy, dx) * 180) / Math.PI;
  const directions: FacingDirection[] = [
    "E",
    "SE",
    "S",
    "SW",
    "W",
    "NW",
    "N",
    "NE",
  ];
  const sectorIndex = Math.round(degree / 45);
  const normalizedIndex = ((sectorIndex % 8) + 8) % 8;

  return directions[(normalizedIndex + 8) % 8];
};
