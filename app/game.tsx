import { View, StyleSheet } from "react-native";
import { useGameStore } from "@/store/use-game-store";
import AppModal from "@/components/modals/app-modal";
import GameCanvas from "@/game/ui/canvas/game-canvas";
import { COLORS } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import Timer from "@/game/ui/canvas/timer";
import { gameResult } from "@/lib/game-result";

export default function GameScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const status = useGameStore((state) => state.status);
  const runId = useGameStore((state) => state.runId);
  const restartGame = useGameStore((state) => state.restartGame);
  const resetGame = useGameStore((state) => state.resetGame);

  const isRunning = status.type === "playing";

  const { visible, title, subTitle } = gameResult(status);

  return (
    <View style={styles.root}>
      <GameCanvas key={runId} isRunning={isRunning} />

      <Timer />

      <AppModal
        visible={visible}
        title={title}
        subTitle={subTitle}
        primaryAction={{ title: "다시하기", onPress: restartGame }}
        secondaryAction={{
          title: "메인으로 돌아가기",
          onPress: () => {
            navigation.replace("Home");
            resetGame();
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.BACKGROUND.GAME },
});
