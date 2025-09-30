import React, { useEffect, useState } from "react";
import { SpriteSheet } from "@/components/sprite-sheet/sprite-sheet";
import type { HeartSpriteKey } from "@/types/heart-hp";
import { getHeartSpriteInfo } from "@/lib/heart-hp-state";
import { toMilliseconds } from "@/utils/time";

type Props = {
  x: number;
  y: number;
  size: number;
  heartState: HeartSpriteKey;
  onDone?: () => void;
};

export default function HeartSprite({ x, y, size, heartState, onDone }: Props) {
  const { src, frameCount, loop, frameDuration } =
    getHeartSpriteInfo(heartState);
  const [frame, setFrame] = useState(0);

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
          return loop
            ? nextFrame % frameCount
            : Math.min(nextFrame, frameCount - 1);
        });
      }

      animationFrameId = requestAnimationFrame(tick);
    };
    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [heartState, frameCount, loop, frameDuration]);

  useEffect(() => {
    if (!loop && frame === frameCount - 1) {
      const tick = setTimeout(() => {
        if (onDone) {
          onDone();
        }
      }, 0);

      return () => clearTimeout(tick);
    }
  }, [loop, frame, frameCount, onDone]);

  return (
    <SpriteSheet
      x={x}
      y={y}
      cols={frameCount}
      rows={1}
      frame={frame}
      cell={size}
      source={src}
    />
  );
}
