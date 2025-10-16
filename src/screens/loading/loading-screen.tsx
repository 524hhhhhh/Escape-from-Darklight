import { View, StyleSheet } from "react-native";
import LoadingScene from "./ui/loading-scene";
import { useLoadingStore } from "@/store/use-loading-store";

export default function LoadingScreen() {
  const isVisible = useLoadingStore((state) => state.isVisible);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={[styles.overlay]} pointerEvents="none">
      <LoadingScene />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.9)",
  },
});
