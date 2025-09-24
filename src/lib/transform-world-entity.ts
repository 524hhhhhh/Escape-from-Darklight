import { tileToWorld, tileCenterToWorld } from "@/utils/coordinate";

type TileEntity = { tileX: number; tileY: number; id?: string };

export function transformWorldEntity<T extends TileEntity>(
  src: T,
  tile: number,
) {
  const { x, y } = tileToWorld(src.tileX, src.tileY, tile);
  const { centerX, centerY } = tileCenterToWorld(src.tileX, src.tileY, tile);
  return {
    ...src,
    worldX: x,
    worldY: y,
    centerX: centerX,
    centerY: centerY,
  };
}
