import { useEffect, useRef, useState } from "react";
import { MILLISECONDS_PER_SECOND } from "@/constants/time";

export function useSpriteAnimation(totalFrames: number, frameRate: number) {
  const [frame, setFrame] = useState(0);
  const startRef = useRef({ currentFrame: 0, elapsedMs: 0 });
  const prevTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let rafId: number;
    const frameDelay = MILLISECONDS_PER_SECOND / frameRate;

    const loop = (now: number) => {
      if (prevTimeRef.current == null) {
        prevTimeRef.current = now;
      }

      const dt = now - prevTimeRef.current;
      prevTimeRef.current = now;

      startRef.current.elapsedMs += dt;

      if (startRef.current.elapsedMs >= frameDelay) {
        startRef.current.elapsedMs -= frameDelay;
        startRef.current.currentFrame =
          (startRef.current.currentFrame + 1) % totalFrames;

        setFrame(startRef.current.currentFrame);
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
  }, [frameRate, totalFrames]);

  return frame;
}
