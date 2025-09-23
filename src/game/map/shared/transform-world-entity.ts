import { tileToWorld, tileCenterToWorld } from "../coordinate";

type TileEntity = { tileX: number; tileY: number; id?: string };

export function transformWorldEntity<T extends TileEntity>(
  src: T,
  tile: number,
) {
  const { x, y } = tileToWorld(src.tileX, src.tileY, tile);
  const { cx, cy } = tileCenterToWorld(src.tileX, src.tileY, tile);
  return {
    ...src,
    worldX: x,
    worldY: y,
    centerX: cx,
    centerY: cy,
  };
}
