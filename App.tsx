import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "app/index";
import StageScreen from "app/stage";
import GameScreen from "app/game";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export type RootStackParamList = {
  Home: undefined;
  Stage: undefined;
  Game: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontLoaded, error] = useFonts({
    Galmuri9: require("./assets/fonts/Galmuri9.ttf"),
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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Stage" component={StageScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
