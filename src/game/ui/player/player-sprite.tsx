import { SPRITE, isRightFacing, PLAYER } from "@/constants/player";
import type { AnimationState, FacingDirection } from "@/types/sprite-animation";
import React from "react";
import { View, Image, StyleSheet } from "react-native";

type Props = {
  x: number;
  y: number;
  direction: FacingDirection;
  state: AnimationState;
  frame: number;
  scale?: number;
};

export default function PlayerSprite({
  x,
  y,
  direction,
  state,
  frame,
  scale = 1,
}: Props) {
  const size = SPRITE.FRAME_SIZE * scale;
  const cols = SPRITE.CLIPS[state].FRAMES;

  const sheetW = SPRITE.FRAME_SIZE * cols * scale;
  const sheetH = SPRITE.FRAME_SIZE * scale;
  const offsetX = -SPRITE.FRAME_SIZE * frame * scale;

  const flipTransform = isRightFacing(direction);
  const anchorYOffset = size * (PLAYER.ANCHOR_Y ?? 0);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          left: Math.round(x - size / 2),
          top: Math.round(y - size / 2 - anchorYOffset),
          transform: flipTransform ? [{ scaleX: -1 }] : [],
        },
      ]}
    >
      <Image
        source={SPRITE.CLIPS[state].SOURCE}
        style={[
          styles.sheet,
          {
            width: sheetW,
            height: sheetH,
            transform: [{ translateX: offsetX }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: "absolute", overflow: "hidden" },
  sheet: { resizeMode: "stretch" },
});
