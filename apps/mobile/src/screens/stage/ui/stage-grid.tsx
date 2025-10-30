import { View, StyleSheet } from "react-native";
import StageCard from "@/screens/stage/ui/stage-card";
import { isStageLocked } from "@/lib/stage-progress";
import type { ChapterId, StageId, StageMeta } from "@/constants/stage-meta";
import { useStageStore } from "@/store/use-stage-store";

type Props = {
  chapterId: ChapterId;
  stages: readonly StageMeta[];
  onSelectStage: (id: StageId) => void;
  onLockedPress?: () => void;
};

export default function StageGrid({
  chapterId,
  stages,
  onSelectStage,
  onLockedPress,
}: Props) {
  const clearedStageIds = useStageStore((state) => state.clearedStageIds);

  return (
    <View style={styles.grid}>
      {stages.map((stage) => {
        const isLocked = isStageLocked(chapterId, stage.id, clearedStageIds);
        const isCleared = clearedStageIds.has(stage.id);

        return (
          <StageCard
            key={stage.id}
            title={stage.title}
            isCleared={isCleared}
            isLocked={isLocked}
            onSelect={() =>
              isLocked ? onLockedPress?.() : onSelectStage(stage.id)
            }
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
});
