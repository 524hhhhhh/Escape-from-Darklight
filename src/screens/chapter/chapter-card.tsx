import { View, Image, StyleSheet, Pressable } from "react-native";
import AppText from "@/components/text/app-text";
import { ChapterId, ChapterThumbnail } from "@/constants/stage-meta";

export default function ChapterCard({
  item,
  width,
  height,
  isLocked,
  onPress,
}: {
  item: ChapterThumbnail;
  width: number;
  height: number;
  isLocked: boolean;
  onPress: (id: ChapterId) => void;
}) {
  return (
    <Pressable
      onPress={() => onPress(item.id)}
      style={({ pressed }) => [
        styles.card,
        { width },
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.imageFrame, { height }]}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        {isLocked && <View style={styles.lockOverlay} />}
      </View>
      <AppText
        variant="TITLE_XL"
        style={[styles.title, isLocked && styles.titleLocked]}
      >
        {item.title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  imageFrame: {
    width: "100%",
    borderRadius: 18,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(36, 44, 72, 0.2)",
  },
  title: {
    marginTop: 14,
  },
  titleLocked: {
    opacity: 0.6,
  },
});
