import { View, StyleSheet } from "react-native";
import StageCard from "@/screens/stage/ui/stage-card";
import { isStageLocked } from "@/lib/stage-progress";
import type { ChapterId, StageId, StageMeta } from "@/constants/stage-meta";

type Props = {
  chapterId: ChapterId;
  stages: readonly StageMeta[];
  clearedStages: Record<string, boolean>;
  onSelectStage: (id: StageId) => void;
  onLockedPress?: () => void;
};

export default function StageGrid({
  chapterId,
  stages,
  clearedStages,
  onSelectStage,
  onLockedPress,
}: Props) {
  return (
    <View style={styles.grid}>
      {stages.map((stage) => {
        const isLocked = isStageLocked(chapterId, stage.id, clearedStages);
        const isCleared = !!clearedStages[stage.id];

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
