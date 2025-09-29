import { View, StyleSheet } from "react-native";
import { useGameStore } from "@/store/use-game-store";
import Button from "@/components/buttons/button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "App";
import AppText from "@/components/text/app-text";

export default function StageScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const start = useGameStore((state) => state.restartGame);

  const startGame = () => {
    start();
    navigation.replace("Game");
  };

  return (
    <View style={styles.root}>
      <AppText variant="TITLE_XL">스테이지 페이지</AppText>

      <Button style={styles.button} title="게임 시작" onPress={startGame} />
      <Button title="뒤로가기" onPress={() => navigation.replace("Home")} />
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
