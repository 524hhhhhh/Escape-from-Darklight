import { GAME_RESULT_MESSAGE } from "@/constants/game-message";
import { GameStatus } from "@/types/game-state";

export function getGameResult(status: GameStatus) {
  if (status.type === "cleared") {
    const { TITLE, SUB_TITLE } = GAME_RESULT_MESSAGE.CLEARED;

    return { visible: true, title: TITLE, subTitle: SUB_TITLE };
  }
  if (status.type === "gameover") {
    const { TITLE, SUB_TITLE } =
      status.reason === "timeout"
        ? GAME_RESULT_MESSAGE.TIMEOUT
        : GAME_RESULT_MESSAGE.DEATH;

    return { visible: true, title: TITLE, subTitle: SUB_TITLE };
  }

  return { visible: false, title: null, subTitle: null };
}
