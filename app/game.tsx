import { View, StyleSheet } from "react-native";
import { useGameStore } from "@/store/use-game-store";
import Button from "@/components/buttons/button";
import AppModal from "@/components/modals/modal";
import GameCanvas from "@/game/ui/canvas/game-canvas";
import { COLORS } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";

export default function GameScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const phase = useGameStore((state) => state.phase);
  const runId = useGameStore((state) => state.runId);
  const setGameState = useGameStore((state) => state.setGameState);
  const restart = useGameStore((state) => state.restart);

  const visible = phase === "cleared" || phase === "gameover";
  const title = phase === "cleared" ? "GAME CLEAR" : "GAME OVER";
  const subTitle = phase === "cleared" ? "탈출 성공" : "시간 초과";

  return (
    <View style={styles.root}>
      <GameCanvas key={runId} isRunning={phase === "playing"} />

      <View style={styles.view}>
        <Button
          style={styles.button}
          title="게임 클리어 처리"
          onPress={() => setGameState("cleared")}
        />

        <Button
          style={styles.button}
          title="게임 오버 처리"
          onPress={() => setGameState("gameover")}
        />
      </View>

      <AppModal
        visible={visible}
        title={title}
        subTitle={subTitle}
        primaryAction={{
          title: "다시하기",
          onPress: restart,
        }}
        secondaryAction={{
          title: "메인으로 돌아가기",
          onPress: () => {
            setGameState("start");
            navigation.replace("Home");
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.BACKGROUND.GAME },
  view: {
    position: "absolute",
    alignSelf: "center",
    bottom: 30,
    right: 20,
  },
  button: {
    marginBottom: 10,
  },
});
