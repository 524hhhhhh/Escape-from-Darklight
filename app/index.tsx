import { COLORS } from "@/constants/theme";
import { router } from "expo-router";
import { Text, Pressable, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <Pressable style={styles.root} onPress={() => router.replace("/stage")}>
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
    backgroundColor: COLORS.BACKGROUND,
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
