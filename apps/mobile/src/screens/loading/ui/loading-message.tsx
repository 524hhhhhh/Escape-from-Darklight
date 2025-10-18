import { View, StyleSheet } from "react-native";
import AppText from "@/components/text/app-text";
import { COLORS } from "@/constants/theme";
import { useTipCycle } from "@/hooks/use-tip-cycle";
import { useLoadingStore } from "@/store/use-loading-store";

export function LoadingMessage() {
  const messages = useLoadingStore(
    (state) => state.loadingInfo?.messages ?? [],
  );
  const tipIndex = useTipCycle(messages);
  const text = messages[tipIndex] ?? "";

  if (messages.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrap}>
      <AppText style={styles.text}>{text}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 28,
    alignItems: "center",
    zIndex: 100,
  },
  text: {
    color: COLORS.TEXT.PRIMARY,
    textAlign: "center",
    fontSize: 20,
    lineHeight: 26,
  },
});
