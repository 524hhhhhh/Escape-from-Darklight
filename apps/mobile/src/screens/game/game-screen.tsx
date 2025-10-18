import { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useGameStore } from "@/store/use-game-store";
import { useChapterStore } from "@/store/use-chapter-store";
import { useStageStore } from "@/store/use-stage-store";
import AppModal from "@/components/modals/app-modal";
import GameScene from "@/screens/game/ui/game-scene";
import { COLORS } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getGameResult } from "@/lib/game-result";
import { MAP_BY_STAGE, type StageId } from "@/constants/stage-meta";
import { getNextStageId } from "@/lib/stage-progress";
import { showLoadingWhile } from "@/lib/show-loading-while";
import type { AppRoutes } from "@/types/navigation";
import { useLoadingStore } from "@/store/use-loading-store";

export default function GameScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppRoutes>>();

  const status = useGameStore((state) => state.status);
  const runId = useGameStore((state) => state.runId);
  const restartGame = useGameStore((state) => state.restartGame);
  const resetGame = useGameStore((state) => state.resetGame);

  const selectedChapterId = useChapterStore((state) => state.selectedChapterId);

  const selectedStageId = useStageStore((state) => state.selectedStageId);
  const markCleared = useStageStore((state) => state.markCleared);
  const selectStage = useStageStore((state) => state.selectStage);

  const isLoading = useLoadingStore((state) => state.isVisible);

  const canControl = status.type === "playing";
  const isRunning =
    (status.type === "playing" || status.type === "death") && !isLoading;

  const { visible, title, subTitle } = getGameResult(status);

  const hasMarkedClearRef = useRef(false);

  useEffect(() => {
    if (status.type === "cleared") {
      if (!hasMarkedClearRef.current && selectedStageId) {
        markCleared(selectedStageId);
        hasMarkedClearRef.current = true;
      }
    } else {
      hasMarkedClearRef.current = false;
    }
  }, [status.type, selectedStageId, markCleared]);

  const nextStageId: StageId | null =
    selectedChapterId && selectedStageId
      ? getNextStageId(selectedChapterId, selectedStageId)
      : null;

  const isLastStage = !nextStageId;

  const handleRetry = async () => {
    await showLoadingWhile(() => {
      restartGame();
    });
  };

  const handleNextStage = async () => {
    if (!nextStageId) {
      return;
    }

    await showLoadingWhile(() => {
      selectStage(nextStageId);
      const nextMap = MAP_BY_STAGE[nextStageId];
      restartGame(nextMap);
    });
  };

  const handleAction =
    status.type !== "cleared" || isLastStage
      ? { title: "다시하기", onPress: handleRetry }
      : { title: "다음으로 이동", onPress: handleNextStage };

  return (
    <View style={styles.root}>
      <GameScene key={runId} isRunning={isRunning} canControl={canControl} />

      <AppModal
        visible={visible}
        title={title}
        subTitle={subTitle}
        primaryAction={handleAction}
        secondaryAction={{
          title: "스테이지 목록으로 이동",
          onPress: async () => {
            await showLoadingWhile(() => {
              resetGame();
              navigation.replace("StageDetail");
            });
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.BACKGROUND.GAME },
});
