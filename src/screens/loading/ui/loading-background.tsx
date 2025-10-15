import { useLoadingAnimation } from "@/hooks/use-loading-animation";
import {
  Animated,
  Image,
  ImageSourcePropType,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
} from "react-native";

type Props = {
  source: ImageSourcePropType;
};

export function LoadingBackground({ source }: Props) {
  const { width, height } = useWindowDimensions();
  const animationProgress = useLoadingAnimation();

  const animatedStyle: ViewStyle = {
    transform: [
      {
        translateX: animationProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -width],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image source={source} style={[styles.image, { width, height }]} />
      <Image source={source} style={[styles.image, { width, height }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    zIndex: 0,
    opacity: 0.6,
  },
  image: {
    resizeMode: "cover",
  },
});
