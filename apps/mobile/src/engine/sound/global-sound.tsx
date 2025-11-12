import { useEffect } from "react";
import { useAudioPlayer } from "expo-audio";
import { BGM_ASSETS, UI_FEEDBACK_ASSETS } from "@/constants/assets/sound";

type Props = {
  isBootCompleted: boolean;
  isLoading: boolean;
  currentRoute: string;
};

const sounds: {
  uiPress: ReturnType<typeof useAudioPlayer> | null;
  gameStart: ReturnType<typeof useAudioPlayer> | null;
  mainBgm: ReturnType<typeof useAudioPlayer> | null;
  ingameBgm: ReturnType<typeof useAudioPlayer> | null;
} = { uiPress: null, gameStart: null, mainBgm: null, ingameBgm: null };

export function playPressSound() {
  const uiPressSound = sounds.uiPress;
  if (!uiPressSound) {
    return;
  }

  uiPressSound.seekTo(0);
  uiPressSound.play();
}

export function playGameStartSound() {
  const gameStartSound = sounds.gameStart;
  if (!gameStartSound) {
    return;
  }

  gameStartSound.seekTo(0);
  gameStartSound.play();
}

export function GlobalSound({
  isBootCompleted,
  isLoading,
  currentRoute,
}: Props) {
  const uiPress = useAudioPlayer(UI_FEEDBACK_ASSETS.PRESS);
  const gameStart = useAudioPlayer(UI_FEEDBACK_ASSETS.GAME_START);
  const mainBgm = useAudioPlayer(BGM_ASSETS.MAIN);
  const ingameBgm = useAudioPlayer(BGM_ASSETS.INGAME);

  useEffect(() => {
    sounds.uiPress = uiPress;
    sounds.gameStart = gameStart;
    sounds.mainBgm = mainBgm;
    sounds.ingameBgm = ingameBgm;

    mainBgm.loop = true;
    ingameBgm.loop = true;

    return () => {
      if (sounds.uiPress === uiPress) sounds.uiPress = null;
      if (sounds.gameStart === gameStart) sounds.gameStart = null;
      if (sounds.mainBgm === mainBgm) sounds.mainBgm = null;
      if (sounds.ingameBgm === ingameBgm) sounds.ingameBgm = null;
    };
  }, [uiPress, gameStart, mainBgm, ingameBgm]);

  useEffect(() => {
    if (!isBootCompleted) {
      return;
    }

    if (isLoading) {
      mainBgm.pause();
      ingameBgm.pause();
      return;
    }

    if (
      currentRoute === "Home" ||
      currentRoute === "Chapter" ||
      currentRoute === "StageDetail"
    ) {
      ingameBgm.pause();
      mainBgm.play();
    } else if (currentRoute === "Game") {
      mainBgm.pause();
      ingameBgm.play();
    } else {
      mainBgm.pause();
      ingameBgm.pause();
    }
  }, [isBootCompleted, isLoading, currentRoute, mainBgm, ingameBgm]);

  return null;
}
