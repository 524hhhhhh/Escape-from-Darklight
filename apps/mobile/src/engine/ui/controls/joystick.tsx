import { useJoystick } from "@/hooks/use-joystick";
import React from "react";
import JoystickView from "../view/joystick-view";
import type { StickVector } from "@/types/joystick";
import { StyleProp, ViewStyle } from "react-native";

type Props = {
  onChange?: (value: StickVector) => void;
  style?: StyleProp<ViewStyle>;
};

export default function Joystick({ onChange, style }: Props) {
  const { stickOffset, panHandlers } = useJoystick({
    onChange,
  });

  return (
    <JoystickView
      stickOffset={stickOffset}
      panHandlers={panHandlers}
      style={style}
    />
  );
}
