import { TileRenderable } from "@/types/tile-render";
import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";

type Props = { items: TileRenderable[] };

export const TileView = memo(
  function TileRenderer({ items }: Props) {
    return (
      <>
        {items.map((item) => (
          <Image
            key={item.key}
            source={item.source}
            style={[
              styles.tile,
              {
                left: item.screenX,
                top: item.screenY,
                width: item.screenW,
                height: item.screenH,
              },
            ]}
            resizeMode="stretch"
          />
        ))}
      </>
    );
  },
  (prev, next) => prev.items === next.items,
);

const styles = StyleSheet.create({
  tile: {
    position: "absolute",
  },
});
