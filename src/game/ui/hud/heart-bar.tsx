import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import HeartSprite from "./heart-sprite";
import { HEART_HP, HEART_UI } from "@/constants/heart-hp";
import type { HeartSpriteKey } from "@/types/heart-hp";
import {
  updateHeartStates,
  getHeartState,
  buildHeartStates,
} from "@/lib/heart-hp-state";

type Props = {
  hp: number;
  maxHp: number;
  x?: number;
  y?: number;
};

export default function HeartBar({ hp, maxHp, x = 0, y = 0 }: Props) {
  const heartCount = Math.ceil(maxHp / HEART_HP);

  const [hearts, setHearts] = useState<HeartSpriteKey[]>(() =>
    buildHeartStates(hp, heartCount),
  );

  const storedHpRef = useRef(hp);

  useEffect(() => {
    setHearts(buildHeartStates(hp, heartCount));
  }, [heartCount, hp]);

  useEffect(() => {
    const storedHp = storedHpRef.current;
    const currentHp = hp;

    if (storedHp === currentHp) {
      return;
    }

    setHearts((prevHearts) =>
      updateHeartStates(storedHp, currentHp, prevHearts),
    );
    storedHpRef.current = currentHp;
  }, [hp]);

  const size = HEART_UI.SIZE;
  const step = HEART_UI.SIZE + HEART_UI.SPACING - HEART_UI.OVERLAP;

  const applyFinalHeartState = (heartIndex: number) => {
    setHearts((prevHearts) => {
      const nextHearts = prevHearts.slice();
      nextHearts[heartIndex] = getHeartState(hp, heartIndex);

      return nextHearts;
    });
  };

  return (
    <View style={[styles.container, { left: x, top: y }]}>
      {hearts.map((heartState, heartIndex) => (
        <HeartSprite
          key={heartIndex}
          x={heartIndex * step}
          y={0}
          size={size}
          heartState={heartState}
          onDone={() => applyFinalHeartState(heartIndex)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});
