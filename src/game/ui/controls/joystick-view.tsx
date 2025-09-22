import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  GestureResponderHandlers,
} from "react-native";
import type { StickOffset } from "@/types/joystick";
import JOYSTICK from "@/constants/joystick";

type Props = {
  stickOffset: StickOffset;
  style?: StyleProp<ViewStyle>;
  panHandlers?: GestureResponderHandlers;
};

export default function JoystickView({
  stickOffset,
  style,
  panHandlers,
}: Props) {
  const joystickSize = JOYSTICK.RADIUS * 2;
  const stickSize = JOYSTICK.STICK_RADIUS * 2;
  const stickTranslateX =
    JOYSTICK.RADIUS + stickOffset.x - JOYSTICK.STICK_RADIUS;
  const stickTranslateY =
    JOYSTICK.RADIUS + stickOffset.y - JOYSTICK.STICK_RADIUS;

  const containerStyle = {
    width: joystickSize,
    height: joystickSize,
    borderRadius: JOYSTICK.RADIUS,
  };

  const stickSizeStyle = {
    width: stickSize,
    height: stickSize,
    borderRadius: JOYSTICK.STICK_RADIUS,
  };

  const stickTransformStyle = {
    transform: [
      { translateX: stickTranslateX },
      { translateY: stickTranslateY },
    ],
  };

  return (
    <View {...panHandlers} style={[styles.base, containerStyle, style]}>
      <View style={[styles.stick, stickSizeStyle, stickTransformStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  stick: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.35)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
});
