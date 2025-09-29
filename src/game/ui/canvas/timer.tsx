import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AppText from "@/components/text/app-text";
import { useGameStore } from "@/store/use-game-store";
import { timeFormat } from "@/utils/time-format";

export default function Timer() {
  const tick = useGameStore((state) => state.tick);
  const phase = useGameStore((state) => state.status.type);
  const timerText = useGameStore(timeFormat);

  useEffect(() => {
    if (phase !== "playing") {
      return;
    }

    const id = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(id);
  }, [phase, tick]);

  return (
    <View style={styles.container}>
      <AppText variant="TITLE_XXL">{timerText}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 24,
    left: 0,
    right: 0,
    alignItems: "center",
    pointerEvents: "none",
  },
});
