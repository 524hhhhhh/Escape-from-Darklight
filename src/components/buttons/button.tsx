import { COLORS } from "@/constants/theme";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
};

export default function Button({ title, onPress, style }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && { opacity: 0.8 },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
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
  text: {
    color: COLORS.TEXT.PRIMARY,
    fontSize: 24,
    fontWeight: "600",
  },
});
