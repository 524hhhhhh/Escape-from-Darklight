import { useEffect, useState } from "react";
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
import { Asset } from "expo-asset";
import { BG_ASSETS, FONTS } from "@/constants/assets/boot";
import { loadGameProgress } from "@/lib/progress";
import { useStageStore } from "@/store/use-stage-store";
import { useLoadingStore } from "@/store/use-loading-store";
import { GlobalSound } from "@/engine/sound/global-sound";

const AppStack = createNativeStackNavigator<AppRoutes>();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontLoaded, error] = useFonts({ Galmuri9: FONTS.DEFAULT });
  const [isBootCompleted, setIsBootCompleted] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<string>("Home");
  const isLoading = useLoadingStore((state) => state.isVisible);

  useEffect(() => {
    if (!fontLoaded && !error) {
      return;
    }

    (async () => {
      try {
        await Asset.loadAsync([BG_ASSETS.LOADING]);
        const { savedStageIds } = await loadGameProgress();

        useStageStore.setState({ clearedStageIds: new Set(savedStageIds) });
      } finally {
        await SplashScreen.hideAsync();
        setIsBootCompleted(true);
      }
    })();
  }, [fontLoaded, error]);

  if (!fontLoaded && !error) {
    return null;
  }

  return (
    <View style={styles.root}>
      <NavigationContainer
        onStateChange={(state) => {
          const route = state?.routes[state.index ?? 0]?.name;
          if (route) setCurrentRoute(route);
        }}
      >
        <AppStack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            animation: "none",
            autoHideHomeIndicator: true,
          }}
        >
          <AppStack.Screen name="Home" component={HomeScreen} />
          <AppStack.Screen name="Chapter" component={ChapterScreen} />
          <AppStack.Screen name="StageDetail" component={StageDetailScreen} />
          <AppStack.Screen name="Game" component={GameScreen} />
        </AppStack.Navigator>
      </NavigationContainer>

      <GlobalSound
        isBootCompleted={isBootCompleted}
        isLoading={isLoading}
        currentRoute={currentRoute}
      />

      <LoadingScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
