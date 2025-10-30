import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppRoutes } from "@/types/navigation";
import { useChapterStore } from "@/store/use-chapter-store";
import { useStageStore } from "@/store/use-stage-store";
import {
  CHAPTER_THUMBNAILS,
  MAP_BY_STAGE,
  STAGES_BY_CHAPTER,
  type StageId,
} from "@/constants/stage-meta";
import StageDetailHeader from "@/screens/stage/ui/stage-header";
import StageGrid from "./ui/stage-grid";
import AppToast from "@/components/toast/app-toast";
import { useGameStore } from "@/store/use-game-store";
import { showLoadingWhile } from "@/lib/show-loading-while";

export default function StageDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppRoutes>>();

  const restartGame = useGameStore((state) => state.restartGame);

  const selectedChapterId = useChapterStore((state) => state.selectedChapterId);

  const selectStage = useStageStore((state) => state.selectStage);

  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    if (!selectedChapterId) {
      navigation.replace("Chapter");
    }
  }, [selectedChapterId, navigation]);

  const selectedChapter = CHAPTER_THUMBNAILS.find(
    (chapter) => chapter.id === selectedChapterId,
  );

  const chapterStages = selectedChapterId
    ? (STAGES_BY_CHAPTER[selectedChapterId] ?? [])
    : [];

  const handlePressStage = async (stageId: StageId) => {
    const mapJson = MAP_BY_STAGE[stageId];
    if (!mapJson) {
      return;
    }

    await showLoadingWhile(() => {
      selectStage(stageId);
      restartGame(mapJson);
      navigation.replace("Game");
    });
  };

  const handlePressLocked = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsToastVisible(true);
  };

  if (!selectedChapterId || !selectedChapter) {
    return null;
  }

  return (
    <ImageBackground
      source={selectedChapter.image}
      style={styles.bg}
      resizeMode="cover"
      imageStyle={styles.bgImage}
    >
      <StageDetailHeader
        title={selectedChapter.title}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.body}>
        <StageGrid
          chapterId={selectedChapterId}
          stages={chapterStages}
          onSelectStage={handlePressStage}
          onLockedPress={handlePressLocked}
        />
      </View>

      <AppToast
        message="🔒 아직 열리지 않은 스테이지입니다."
        visible={isToastVisible}
        onHide={() => setIsToastVisible(false)}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bgImage: { opacity: 0.85 },
  body: { paddingVertical: 32, paddingHorizontal: 20 },
});
