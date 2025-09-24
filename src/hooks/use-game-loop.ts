import { useEffect, useRef, useState, useCallback } from "react";
import type { WorldSystem } from "@/types/world-engine";
import { WorldState } from "@/types/world-state";

const INT31 = 2147483647;

export function useGameLoop(
  initialWorldState: WorldState,
  systems: WorldSystem[],
) {
  const worldStateRef = useRef<WorldState>(initialWorldState);
  const [, setTick] = useState(0);

  const rafId = useRef<number | null>(null);
  const lastFrameTime = useRef<number | null>(null);
  const isRunning = useRef<boolean>(false);

  useEffect(() => {
    worldStateRef.current = initialWorldState;
  }, [initialWorldState]);

  const loop = useCallback(
    (now: number) => {
      if (!isRunning.current) {
        return;
      }

      if (lastFrameTime.current == null) {
        lastFrameTime.current = now;
      }
      const delta = now - lastFrameTime.current;
      lastFrameTime.current = now;

      const world = worldStateRef.current;
      const frameInfo = { time: { delta, now } };

      for (const system of systems) {
        system(world, frameInfo);
      }

      setTick((tick) => (tick + 1) % INT31);
      rafId.current = requestAnimationFrame(loop);
    },
    [systems],
  );

  const start = useCallback(() => {
    if (!isRunning.current) {
      isRunning.current = true;
      lastFrameTime.current = null;
      rafId.current = requestAnimationFrame(loop);
    }
  }, [loop]);

  const cancelRaf = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      isRunning.current = false;
      cancelRaf();
    };
  }, [cancelRaf]);

  const stop = useCallback(() => {
    isRunning.current = false;
    cancelRaf();
  }, [cancelRaf]);

  const resetWorld = useCallback((newWorld: WorldState) => {
    worldStateRef.current = newWorld;
    lastFrameTime.current = null;
    setTick((tick) => (tick + 1) % INT31);
  }, []);

  return {
    start,
    stop,
    resetWorld,
    getWorld: () => worldStateRef.current,
  };
}
