import { View, Text, StyleSheet } from "react-native";
import { useGameStore } from "@/store/use-game-store";
import { router } from "expo-router";
import Button from "@/components/common/buttons/button";
import AppModal from "@/components/common/modals/modal";

export default function GamePage() {
  const phase = useGameStore((state) => state.phase);
  const setGameState = useGameStore((state) => state.setGameState);

  const visible = phase === "cleared" || phase === "gameover";
  const title = phase === "cleared" ? "GAME CLEAR" : "GAME OVER";
  const subTitle = phase === "cleared" ? "탈출 성공" : "시간 초과";

  return (
    <View style={styles.root}>
      {phase === "playing" ? (
        <Text>게임 진행 중...</Text>
      ) : (
        <Text>게임이 아직 시작되지 않았습니다.</Text>
      )}

      <Button
        style={styles.button}
        title="게임 클리어 처리"
        onPress={() => setGameState("cleared")}
      />

      <Button title="게임 오버 처리" onPress={() => setGameState("gameover")} />

      <AppModal
        visible={visible}
        title={title}
        subTitle={subTitle}
        primaryAction={{
          title: "다시하기",
          onPress: () => setGameState("playing"),
        }}
        secondaryAction={{
          title: "메인으로 돌아가기",
          onPress: () => {
            setGameState("start");
            router.replace("/");
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBottom: 10,
  },
});
