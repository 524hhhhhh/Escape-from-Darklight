import { useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import AppText from "@/components/text/app-text";
import { COLORS } from "@/constants/theme";

type AppToastProps = {
  message: string;
  visible: boolean;
  onHide: () => void;
};

export default function AppToast({ message, visible, onHide }: AppToastProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    const anim = Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(1200),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]);

    anim.start(onHide);
    return () => anim.stop();
  }, [visible, onHide, fadeAnim]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
      <AppText variant="CAPTION" style={styles.text}>
        {message}
      </AppText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    zIndex: 999,
  },
  text: {
    color: COLORS.TEXT.PRIMARY,
  },
});
