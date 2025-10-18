import { View, StyleSheet } from "react-native";
import { RunnerSprite } from "./runner-sprite";
import { LoadingMessage } from "./loading-message";
import { LoadingBackground } from "./loading-background";
import { BG_ASSETS } from "@/constants/assets/boot";
import { COLORS } from "@/constants/theme";

export default function LoadingScene() {
  return (
    <View style={styles.root}>
      <LoadingBackground source={BG_ASSETS.LOADING} />

      <RunnerSprite />

      <LoadingMessage />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.BACKGROUND.GAME },
});
