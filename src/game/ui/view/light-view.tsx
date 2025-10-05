import React from "react";
import { Image, View, StyleSheet } from "react-native";
import {
  LIGHT_ASSET,
  VISIBLE_AREA,
  LIGHT_MARGIN_RATIO,
} from "@/constants/light";

type Props = {
  width: number;
  height: number;
  screenCenterX: number;
  screenCenterY: number;
  screenRadius: number;
  zIndex?: number;
};

export default function LightView({
  width,
  height,
  screenCenterX,
  screenCenterY,
  screenRadius,
  zIndex = 20,
}: Props) {
  if (width <= 0 || height <= 0 || screenRadius <= 0) {
    return null;
  }

  const radiusScale = screenRadius / VISIBLE_AREA.RADIUS;

  const edgeX = Math.max(screenCenterX, width - screenCenterX);
  const edgeY = Math.max(screenCenterY, height - screenCenterY);
  const scaleCover = Math.max(
    (edgeX * 2) / LIGHT_ASSET.WIDTH,
    (edgeY * 2) / LIGHT_ASSET.HEIGHT,
  );

  const scale = Math.max(radiusScale, scaleCover) * (1 + LIGHT_MARGIN_RATIO);

  const scaledW = Math.ceil(LIGHT_ASSET.WIDTH * scale);
  const scaledH = Math.ceil(LIGHT_ASSET.HEIGHT * scale);

  const left = Math.floor(screenCenterX - VISIBLE_AREA.CENTER_X * scale);
  const top = Math.floor(screenCenterY - VISIBLE_AREA.CENTER_Y * scale);

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { zIndex }]}>
      <Image
        source={require("@assets/light.png")}
        style={[styles.overlay, { left, top, width: scaledW, height: scaledH }]}
        resizeMode="stretch"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    position: "absolute",
  },
});
