import { GameStatus } from "@/types/game-state";

export function gameResult(status: GameStatus) {
  if (status.type === "cleared") {
    return { visible: true, title: "GAME CLEAR", subTitle: "탈출 성공" };
  }
  if (status.type === "gameover") {
    return {
      visible: true,
      title: "GAME OVER",
      subTitle: status.reason === "timeout" ? "시간 초과" : "생명 소진",
    };
  }

  return { visible: false, title: null, subTitle: null };
}
