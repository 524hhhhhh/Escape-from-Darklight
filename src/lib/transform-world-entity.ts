import { tileToWorld, tileCenterToWorld } from "@/utils/coordinate";

type TileEntity = { tileX: number; tileY: number; id?: string };

export function transformWorldEntity<T extends TileEntity>(
  src: T,
  tile: number,
) {
  const { worldX, worldY } = tileToWorld(src.tileX, src.tileY, tile);
  const { centerX, centerY } = tileCenterToWorld(src.tileX, src.tileY, tile);

  return {
    ...src,
    worldX: worldX,
    worldY: worldY,
    centerX: centerX,
    centerY: centerY,
  };
}
