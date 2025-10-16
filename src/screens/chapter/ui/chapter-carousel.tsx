import { View, FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { CHAPTER_THUMBNAILS, ChapterId } from "@/constants/stage-meta";
import ChapterCard from "@/screens/chapter/ui/chapter-card";
import { useChapterStore } from "@/store/use-chapter-store";

const Separator = () => <View style={styles.separator} />;

export default function ChapterCarousel({
  onSelect,
}: {
  onSelect: (id: ChapterId) => void;
}) {
  const width = useWindowDimensions().width;

  const CARD_W = Math.min(width * 0.9, 520);
  const CARD_H = CARD_W * 0.5;
  const SIDE = (width - CARD_W) / 2;

  const snapOffsets = CHAPTER_THUMBNAILS.map((_, i) => i * (CARD_W + 16));

  const unlocked = useChapterStore((state) => state.unlockedChapters);

  return (
    <View style={styles.container}>
      <FlatList
        data={CHAPTER_THUMBNAILS}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToOffsets={snapOffsets}
        decelerationRate="fast"
        disableIntervalMomentum
        contentContainerStyle={{ paddingHorizontal: SIDE }}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => {
          const isLocked = unlocked[item.id] !== true;
          return (
            <ChapterCard
              item={item}
              width={CARD_W}
              height={CARD_H}
              isLocked={isLocked}
              onPress={onSelect}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  separator: { width: 16 },
});
