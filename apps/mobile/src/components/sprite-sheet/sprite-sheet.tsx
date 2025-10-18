import { View, Image, StyleSheet } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { sliceFrame } from "@/lib/sprite";
import { useMemo } from "react";

type SpriteSheetProps = {
  x: number;
  y: number;
  frame: number;
  cols: number;
  rows: number;
  cell: number;
  anchorY?: number;
  source: ImageSourcePropType;
  flipX?: boolean;
};

export function SpriteSheet({
  x,
  y,
  frame,
  cols,
  rows,
  cell,
  anchorY = 0,
  source,
  flipX,
}: SpriteSheetProps) {
  const { col, row } = sliceFrame(frame, cols);

  const { containerStyle, imageStyle } = useMemo(() => {
    const sheetW = cell * cols;
    const sheetH = cell * rows;
    const offsetX = -cell * col;
    const offsetY = -cell * row;
    const anchorYOffset = cell * anchorY;

    return {
      containerStyle: {
        width: cell,
        height: cell,
        left: Math.round(x - cell / 2),
        top: Math.round(y - cell / 2 - anchorYOffset),
        transform: flipX ? [{ scaleX: -1 }] : [],
      } as const,

      imageStyle: {
        width: sheetW,
        height: sheetH,
        transform: [{ translateX: offsetX }, { translateY: offsetY }],
      } as const,
    };
  }, [x, y, cols, rows, cell, anchorY, flipX, col, row]);

  return (
    <View style={[styles.container, containerStyle]} pointerEvents="none">
      <Image source={source} style={[styles.sheet, imageStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    overflow: "hidden",
  },
  sheet: {
    resizeMode: "stretch",
  },
});
