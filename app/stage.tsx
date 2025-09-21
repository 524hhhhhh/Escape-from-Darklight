import { View, Text, StyleSheet } from "react-native";
import { useGameStore } from "@/store/use-game-store";
import { router } from "expo-router";
import Button from "@/components/common/buttons/button";

export default function StageScreen() {
  const setGameState = useGameStore((start) => start.setGameState);

  const startGame = () => {
    setGameState("playing");
    router.replace("/game");
  };

  return (
    <View style={styles.root}>
      <Text>스테이지 페이지</Text>

      <Button style={styles.button} title="게임 시작" onPress={startGame} />
      <Button title="뒤로가기" onPress={() => router.replace("/")} />
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
