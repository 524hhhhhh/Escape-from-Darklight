import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import HeartSprite from "./heart-sprite";
import { HEART } from "@/constants/heart-hp";
import { updateHeartStates, buildHeartStates } from "@/lib/heart-hp-state";
import type { HeartClipKey } from "@/types/heart-hp";

type Props = {
  hp: number;
  maxHp: number;
  x?: number;
  y?: number;
};

export default function HeartBar({ hp, maxHp, x = 0, y = 0 }: Props) {
  const heartCount = Math.max(0, Math.ceil(maxHp / HEART.UNIT));

  const [hearts, setHearts] = useState<HeartClipKey[]>(() =>
    buildHeartStates(hp, heartCount),
  );

  const storedHpRef = useRef(hp);

  useEffect(() => {
    const previousHp = storedHpRef.current;
    const nextHp = hp;

    setHearts((prevHearts) => {
      if (prevHearts.length !== heartCount) {
        return buildHeartStates(nextHp, heartCount);
      }
      return updateHeartStates(previousHp, nextHp, prevHearts);
    });

    storedHpRef.current = nextHp;
  }, [hp, heartCount]);

  const size = HEART.UI.SIZE;
  const step = HEART.UI.SIZE + HEART.UI.SPACING - HEART.UI.OVERLAP;

  return (
    <View
      style={[styles.container, { left: Math.round(x), top: Math.round(y) }]}
    >
      {hearts.map((heartState, heartIndex) => (
        <HeartSprite
          key={heartIndex}
          x={Math.round(heartIndex * step)}
          y={0}
          size={size}
          heartState={heartState}
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
