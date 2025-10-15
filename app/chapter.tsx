import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import { RootStackParamList } from "App";
import AppText from "@/components/text/app-text";
import ChapterCarousel from "@/screens/chapter/chapter-carousel";
import { COLORS } from "@/constants/theme";
import { useChapterStore } from "@/store/use-chapter-store";
import IconButton from "@/components/buttons/icon-button";
import { ChapterId } from "@/constants/stage-meta";
import AppToast from "@/components/toast/app-toast";

export default function ChapterScreen() {
  const [isToastVisible, setIsToastVisible] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const selectChapter = useChapterStore((state) => state.selectChapter);
  const unlockedChapters = useChapterStore((state) => state.unlockedChapters);

  const showLockedToast = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setIsToastVisible(true);
  };

  const handleSelectChapter = (chapterId: ChapterId) => {
    const isLocked = unlockedChapters[chapterId] !== true;
    if (isLocked) {
      showLockedToast();
      return;
    }

    selectChapter(chapterId);
    navigation.navigate("StageDetail");
  };

  return (
    <View style={styles.root}>
      <AppText variant="TITLE_XL" style={styles.title}>
        챕터 선택
      </AppText>

      <IconButton
        icon="←"
        onPress={() => navigation.replace("Home")}
        style={styles.backBtn}
      />

      <ChapterCarousel onSelect={handleSelectChapter} />

      <AppToast
        message="🔒 아직 열리지 않은 챕터입니다."
        visible={isToastVisible}
        onHide={() => setIsToastVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.BACKGROUND.CHAPTER,
  },
  title: { marginVertical: 20 },
  backBtn: {
    position: "absolute",
    left: 28,
    top: 24,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
});
