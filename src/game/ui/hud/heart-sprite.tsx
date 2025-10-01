import React, { useEffect, useState } from "react";
import { SpriteSheet } from "@/components/sprite-sheet/sprite-sheet";
import { toMilliseconds } from "@/utils/time";
import { getHeartSpriteInfo } from "@/lib/heart-hp-state";
import { HeartClipKey } from "@/types/heart-hp";

type Props = {
  x: number;
  y: number;
  size: number;
  heartState: HeartClipKey;
};

export default function HeartSprite({ x, y, size, heartState }: Props) {
  const [frame, setFrame] = useState(0);
  const { src, cols, rows, startIndex, frameCount, isLoop, frameDuration } =
    getHeartSpriteInfo(heartState);

  useEffect(() => {
    setFrame(0);

    const isStaticSprite =
      frameCount <= 1 || !isFinite(frameDuration) || frameDuration <= 0;

    if (isStaticSprite) {
      setFrame(frameCount > 0 ? frameCount - 1 : 0);
      return;
    }

    const delayMs = toMilliseconds(frameDuration);
    let animationFrameId = 0;
    let previousTime = performance.now();
    let timeBuffer = 0;

    const tick = (now: number) => {
      timeBuffer += now - previousTime;
      previousTime = now;

      while (timeBuffer >= delayMs) {
        timeBuffer -= delayMs;

        setFrame((prev) => {
          const nextFrame = prev + 1;

          return isLoop
            ? nextFrame % frameCount
            : Math.min(nextFrame, frameCount - 1);
        });
      }

      animationFrameId = requestAnimationFrame(tick);
    };
    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [heartState, frameCount, isLoop, frameDuration]);

  const localFrameIndex = frameCount > 0 ? Math.min(frame, frameCount - 1) : 0;
  const globalFrameIndex = startIndex + localFrameIndex;

  return (
    <SpriteSheet
      x={Math.round(x)}
      y={Math.round(y)}
      cols={cols}
      rows={rows}
      frame={globalFrameIndex}
      cell={Math.round(size)}
      source={src}
    />
  );
}
