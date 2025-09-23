import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "app/index";
import StageScreen from "app/stage";
import GameScreen from "app/game";

export type RootStackParamList = {
  Home: undefined;
  Stage: undefined;
  Game: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
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
