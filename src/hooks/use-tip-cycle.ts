import { useEffect, useState } from "react";
import { LOADING_TIME } from "@/constants/time";

export function useTipCycle(messages: string[]) {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) {
      return;
    }

    const intervalId = setInterval(() => {
      setTipIndex((i) => (i + 1) % messages.length);
    }, LOADING_TIME.TIP_CYCLE_MS);

    return () => clearInterval(intervalId);
  }, [messages]);

  return tipIndex;
}
