import { COLORS, FONTS } from "@/constants/theme";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import AppText from "@/components/text/app-text";
import { playPressSound } from "@/engine/sound/global-sound";

type Variant = keyof typeof FONTS;

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  variant?: Variant;
};

export default function Button({
  title,
  onPress,
  style,
  variant,
}: ButtonProps) {
  const handlePress = () => {
    playPressSound();
    onPress();
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && { opacity: 0.8 },
        style,
      ]}
      onPress={handlePress}
    >
      <AppText variant={variant}>{title}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 40,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
