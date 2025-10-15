import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/home/home-screen";
import ChapterScreen from "@/screens/chapter/chapter-screen";
import StageDetailScreen from "@/screens/stage/stage-detail-screen";
import GameScreen from "@/screens/game/game-screen";
import { useFonts } from "expo-font";
import LoadingScreen from "@/screens/loading/loading-screen";
import * as SplashScreen from "expo-splash-screen";
import { View, StyleSheet } from "react-native";
import type { AppRoutes } from "@/types/navigation";

const AppStack = createNativeStackNavigator<AppRoutes>();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontLoaded, error] = useFonts({
    Galmuri9: require("@assets/fonts/Galmuri9.ttf"),
  });

  useEffect(() => {
    if (fontLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, error]);

  if (!fontLoaded && !error) {
    return null;
  }

  return (
    <View style={styles.root}>
      <NavigationContainer>
        <AppStack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false, animation: "none" }}
        >
          <AppStack.Screen name="Home" component={HomeScreen} />
          <AppStack.Screen name="Chapter" component={ChapterScreen} />
          <AppStack.Screen name="StageDetail" component={StageDetailScreen} />
          <AppStack.Screen name="Game" component={GameScreen} />
        </AppStack.Navigator>
      </NavigationContainer>

      <LoadingScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
