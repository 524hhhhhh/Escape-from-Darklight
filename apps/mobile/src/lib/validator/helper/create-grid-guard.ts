export function createGridGuard(grid: number[][]) {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;

  return (x: number, y: number) => x >= 0 && y >= 0 && y < rows && x < cols;
}
