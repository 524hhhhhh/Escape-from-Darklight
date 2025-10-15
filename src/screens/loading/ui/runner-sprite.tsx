import { View, StyleSheet, useWindowDimensions } from "react-native";
import { SpriteSheet } from "@/components/sprite-sheet/sprite-sheet";
import { SPRITE, FRAME_RATE } from "@/constants/player";
import { useSpriteAnimation } from "@/hooks/use-sprite-animation";

export const RunnerSprite = () => {
  const { width } = useWindowDimensions();
  const frame = useSpriteAnimation(SPRITE.CLIPS.RUN.FRAMES, FRAME_RATE.RUN);

  const cols = SPRITE.CLIPS.RUN.FRAMES;
  const cell = SPRITE.FRAME_SIZE * 6;
  const source = SPRITE.CLIPS.RUN.SOURCE;

  return (
    <View style={styles.container}>
      <SpriteSheet
        x={Math.round(width / 2)}
        y={0}
        frame={frame}
        cols={cols}
        rows={1}
        cell={cell}
        source={source}
        flipX
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 160,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 99,
  },
});
