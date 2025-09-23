import { COLORS } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { Text, Pressable, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable style={styles.root} onPress={() => navigation.replace("Stage")}>
      <View style={styles.logoBox}>
        <Text style={styles.logoText}>로고</Text>
      </View>

      <Text style={styles.guide}>시작하려면 누르세요</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND.HOME,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
  },
  logoBox: {
    width: "50%",
    height: 170,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  guide: {
    position: "absolute",
    bottom: 32,
    textAlign: "center",
    fontSize: 24,
    color: COLORS.TEXT.PRIMARY,
    opacity: 0.9,
  },
});
