import { LOADING_TIME } from "@/constants/time";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export function useLoadingAnimation() {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopAnim = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: LOADING_TIME.BG_SCROLL_DURATION_MS,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { resetBeforeIteration: true },
    );

    loopAnim.start();

    return () => {
      loopAnim.stop();
      progress.setValue(0);
    };
  }, [progress]);

  return progress;
}
