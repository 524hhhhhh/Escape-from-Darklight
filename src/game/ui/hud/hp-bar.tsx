import React, { useMemo } from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";

type Props = {
  hp: number;
  maxHp: number;
  style?: StyleProp<ViewStyle>;
};

export default function HpBar({ hp, maxHp, style }: Props) {
  const ratio = hp / maxHp;

  const fillStyle = useMemo<ViewStyle>(
    () => ({
      transform: [{ scaleX: ratio }],
      backgroundColor: ratio > 0.3 ? "red" : "darkred",
    }),
    [ratio],
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.track} />
      <View style={[styles.fill, fillStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    borderRadius: 6,
    overflow: "hidden",
  },
  track: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#333",
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
    transformOrigin: "left",
  },
});
