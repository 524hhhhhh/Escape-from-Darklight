import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ImageBackground, Pressable, StyleSheet } from "react-native";
import AppText from "@/components/text/app-text";
import type { AppRoutes } from "@/types/navigation";
import { BG_ASSETS } from "@/constants/assets/boot";
import { playPressSound } from "@/engine/sound/global-sound";

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppRoutes>>();

  return (
    <Pressable
      style={styles.root}
      onPressIn={playPressSound}
      onPress={() => navigation.replace("Chapter")}
    >
      <ImageBackground
        source={BG_ASSETS.HOME}
        style={styles.background}
        resizeMode="cover"
      >
        <ImageBackground
          source={BG_ASSETS.LOGO}
          style={styles.logo}
          resizeMode="contain"
        />

        <AppText variant="TITLE_M" style={styles.guide}>
          시작하려면 누르세요
        </AppText>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: 300,
    marginBottom: 120,
  },
  guide: {
    position: "absolute",
    bottom: 32,
    textAlign: "center",
    opacity: 0.9,
  },
});
