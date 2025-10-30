import { MILLISECONDS_PER_SECOND } from "@/constants/time";
import { FrameInfo } from "@/types/world-engine";

const toSeconds = (ms: number) => ms / MILLISECONDS_PER_SECOND;
const toMilliseconds = (sec: number) => sec * MILLISECONDS_PER_SECOND;

const nowSeconds = (frameInfo: FrameInfo) => toSeconds(frameInfo.time.now ?? 0);

const deltaSeconds = (frameInfo: FrameInfo, fallbackMs = 16.67): number => {
  return (frameInfo.time.delta ?? fallbackMs) / 1000;
};

export { toSeconds, toMilliseconds, nowSeconds, deltaSeconds };
