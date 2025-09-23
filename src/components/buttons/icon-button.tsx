import { COLORS } from "@/constants/theme";
import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";

type IconButtonProps = {
  onPress: () => void;
  icon: string | React.ReactNode;
  background?: string;
  style?: ViewStyle;
};

export default function IconButton({
  onPress,
  icon,
  background = COLORS.RED,
  style,
}: IconButtonProps) {
  const content =
    typeof icon === "string" ? <Text style={styles.icon}>{icon}</Text> : icon;

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: background, opacity: pressed ? 0.85 : 1 },
        style,
      ]}
      accessibilityRole="button"
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },
});
