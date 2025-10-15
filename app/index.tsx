import { COLORS } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "@/components/text/app-text";

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      style={styles.root}
      onPress={() => navigation.replace("Chapter")}
    >
      <View style={styles.logoBox}>
        <AppText variant="TITLE_XL" style={styles.logoText}>
          로고
        </AppText>
      </View>

      <AppText variant="TITLE_M" style={styles.guide}>
        시작하려면 누르세요
      </AppText>
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
    color: "#111827",
  },
  guide: {
    position: "absolute",
    bottom: 32,
    textAlign: "center",
    opacity: 0.9,
  },
});
