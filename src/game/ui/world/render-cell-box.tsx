import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

export function renderCellBox(key: string, styleBox: ViewStyle, color: string) {
  return (
    <View
      key={key}
      style={[styles.cell, styleBox, { backgroundColor: color }]}
    />
  );
}

const styles = StyleSheet.create({
  cell: {
    position: "absolute",
  },
});
