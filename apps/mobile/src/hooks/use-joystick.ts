import { StickOffset, StickVector } from "@/types/joystick";
import { useState, useCallback, useRef } from "react";
import { PanResponder, GestureResponderEvent } from "react-native";
import { normalizeVector, limitDistance } from "../utils/math";
import JOYSTICK from "@/constants/joystick";
import { applyDeadzone, vectorToAngle } from "../utils/joystick-input";

type Props = {
  onChange?: (v: StickVector) => void;
};

export function useJoystick({ onChange }: Props) {
  const [stickOffset, setStickOffset] = useState<StickOffset>({ x: 0, y: 0 });

  const maxDistance = JOYSTICK.RADIUS - JOYSTICK.STICK_RADIUS;

  const centerXRef = useRef(0);
  const centerYRef = useRef(0);

  const resetStick = useCallback(() => {
    setStickOffset({ x: 0, y: 0 });
    onChange?.({ x: 0, y: 0, strength: 0, angle: 0 });
  }, [onChange]);

  const applyDrag = useCallback(
    (dx: number, dy: number) => {
      const { directionX, directionY, length } = normalizeVector(dx, dy);
      const limitedDistance = limitDistance(length, maxDistance);

      setStickOffset({
        x: directionX * limitedDistance,
        y: directionY * limitedDistance,
      });

      const distanceRatio = limitedDistance / maxDistance;
      const rawStrength = applyDeadzone(distanceRatio, JOYSTICK.DEADZONE);

      const strength = Math.sqrt(rawStrength);
      const angle = vectorToAngle(directionX, directionY);

      onChange?.({
        x: directionX * strength,
        y: directionY * strength,
        strength,
        angle,
      });
    },
    [maxDistance, onChange],
  );

  const handleGrantStick = (e: GestureResponderEvent) => {
    const { pageX, pageY } = e.nativeEvent;
    centerXRef.current = pageX;
    centerYRef.current = pageY;

    applyDrag(0, 0);
  };

  const handleMoveStick = (e: GestureResponderEvent) => {
    const { pageX, pageY } = e.nativeEvent;

    applyDrag(pageX - centerXRef.current, pageY - centerYRef.current);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: handleGrantStick,
      onPanResponderMove: handleMoveStick,
      onPanResponderRelease: resetStick,
      onPanResponderTerminate: resetStick,
    }),
  ).current;

  return {
    stickOffset,
    panHandlers: panResponder.panHandlers,
    reset: resetStick,
  };
}
