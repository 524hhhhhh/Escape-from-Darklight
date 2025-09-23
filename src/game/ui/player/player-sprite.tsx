import { SPRITE } from "@/constants/player";
import { FacingDirection } from "@/types/sprite";
import { getSpriteColumn } from "@/utils/sprite";
import React from "react";
import { View, Image, StyleSheet } from "react-native";

type Props = {
  x: number;
  y: number;
  direction: FacingDirection;
  frame?: number;
  scale?: number;
};

export default function PlayerSprite({
  x,
  y,
  direction,
  frame = 0,
  scale = 1,
}: Props) {
  const spriteColumnIndex = getSpriteColumn(direction, frame);

  const size = SPRITE.FRAME_SIZE * scale;
  const totalCols = SPRITE.DIRECTIONS.length * SPRITE.FRAMES_PER_DIRECTION;
  const sheetW = SPRITE.FRAME_SIZE * totalCols * scale;
  const sheetH = SPRITE.FRAME_SIZE * scale;
  const offsetX = -SPRITE.FRAME_SIZE * spriteColumnIndex * scale;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          left: x - size / 2,
          top: y - size / 2,
        },
      ]}
    >
      <Image
        source={require("@assets/player.png")}
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
  container: {
    position: "absolute",
    overflow: "hidden",
  },
  sheet: {
    resizeMode: "cover",
  },
});
