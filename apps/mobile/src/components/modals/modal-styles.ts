import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

export const modalStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  dim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "70%",
    maxWidth: 820,
    minHeight: 340,
    borderRadius: 24,
    backgroundColor: COLORS.TERTIARY,
    paddingHorizontal: 32,
    paddingVertical: 28,
    alignItems: "center",
  },
  title: {
    letterSpacing: 1,
    marginTop: 8,
  },
  subTitle: {
    marginTop: 8,
    opacity: 0.9,
  },
  actions: {
    width: "100%",
    position: "absolute",
    gap: 18,
    bottom: 40,
    alignItems: "center",
  },
  closeProps: {
    position: "absolute",
    top: 18,
    right: 18,
  },
});
