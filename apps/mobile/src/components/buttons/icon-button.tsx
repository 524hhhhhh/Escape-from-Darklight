import { COLORS } from "@/constants/theme";
import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import AppText from "@/components/text/app-text";

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
    typeof icon === "string" ? (
      <AppText variant="TITLE_M">{icon}</AppText>
    ) : (
      icon
    );

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
});
