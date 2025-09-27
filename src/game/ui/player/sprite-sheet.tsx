import { View, Image, StyleSheet } from "react-native";
import type { ImageSourcePropType } from "react-native";
import { sliceFrame } from "@/lib/sprite";

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
  const sheetW = cell * cols;
  const sheetH = cell * rows;
  const offsetX = -cell * col;
  const offsetY = -cell * row;
  const anchorYOffset = cell * anchorY;

  return (
    <View
      style={[
        styles.container,
        {
          width: cell,
          height: cell,
          left: Math.round(x - cell / 2),
          top: Math.round(y - cell / 2 - anchorYOffset),
          transform: flipX ? [{ scaleX: -1 }] : [],
        },
      ]}
    >
      <Image
        source={source}
        style={[
          styles.sheet,
          {
            width: sheetW,
            height: sheetH,
            transform: [{ translateX: offsetX }, { translateY: offsetY }],
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
    resizeMode: "stretch",
  },
});
