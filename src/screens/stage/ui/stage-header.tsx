import { StyleSheet, View } from "react-native";
import AppText from "@/components/text/app-text";
import IconButton from "@/components/buttons/icon-button";

type Props = { title: string; onBack: () => void };

export default function StageDetailHeader({ title, onBack }: Props) {
  return (
    <View style={styles.header}>
      <IconButton icon="←" onPress={onBack} style={styles.backBtn} />
      <AppText variant="TITLE_XL" style={styles.title}>
        {title}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 24,
    paddingBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  backBtn: {
    position: "absolute",
    left: 28,
    top: 24,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  title: { marginTop: 4 },
});
