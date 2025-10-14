import { Pressable, View, StyleSheet } from "react-native";
import AppText from "@/components/text/app-text";
import { COLORS } from "@/constants/theme";

type Props = {
  title: string;
  isCleared?: boolean;
  isLocked?: boolean;
  onSelect?: () => void;
};

export default function StageCard({
  title,
  isCleared,
  isLocked,
  onSelect,
}: Props) {
  return (
    <Pressable
      onPress={onSelect}
      style={({ pressed }) => [
        styles.card,
        isCleared && styles.cardCleared,
        isLocked && styles.cardLocked,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        <AppText variant="BODY">{title}</AppText>
        {isCleared && (
          <AppText variant="BODY" style={styles.clearedLabel}>
            클리어
          </AppText>
        )}
        {isLocked && (
          <AppText variant="BODY" style={styles.lockedLabel}>
            잠김
          </AppText>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 90,
    height: 90,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.55)",
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  cardCleared: {
    borderColor: COLORS.SECONDARY,
    backgroundColor: COLORS.PRIMARY,
  },
  cardLocked: {
    opacity: 0.6,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  clearedLabel: {
    marginTop: 6,
    color: COLORS.TEXT.SECONDARY,
  },
  lockedLabel: {
    marginTop: 6,
    color: COLORS.TEXT.DISABLED,
    opacity: 0.7,
  },
});
