import { COLORS } from "@/constants/theme";
import React from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  x: number;
  y: number;
  size: number;
  progress: number;
  active: boolean;
};

export default function SwitchHoldProgress({
  x,
  y,
  size,
  progress,
  active,
}: Props) {
  if (progress <= 0 && !active) {
    return null;
  }

  const fillScale = Math.min(1, Math.max(0, progress));
  const borderSize = size * 0.1;
  const innerSize = size - borderSize * 2;

  return (
    <View
      style={[
        styles.container,
        {
          left: x - size / 2,
          top: y - size / 2,
          width: size,
          height: size,
        },
      ]}
    >
      <View
        style={[
          styles.outerCircle,
          { width: size, height: size, borderWidth: borderSize },
        ]}
      />

      <View
        style={[
          styles.innerCircle,
          { width: innerSize * fillScale, height: innerSize * fillScale },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    pointerEvents: "none",
  },
  outerCircle: {
    position: "absolute",
    borderRadius: 999,
    borderColor: "rgba(255,255,255,0.3)",
  },
  innerCircle: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: COLORS.PRIMARY,
  },
});
