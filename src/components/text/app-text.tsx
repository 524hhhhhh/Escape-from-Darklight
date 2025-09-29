import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { COLORS, FONTS } from "@/constants/theme";

type Variant = keyof typeof FONTS;

type AppTextProps = TextProps & {
  variant?: Variant;
};

export default function AppText({
  style,
  variant = "TITLE_M",
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[styles.title, { fontSize: FONTS[variant] }, style]}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Galmuri9",
    color: COLORS.TEXT.PRIMARY,
  },
});
