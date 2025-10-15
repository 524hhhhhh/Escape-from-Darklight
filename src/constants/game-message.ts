const GAME_RESULT_MESSAGE = {
  CLEARED: { TITLE: "GAME CLEAR", SUB_TITLE: "탈출 성공" },
  TIMEOUT: { TITLE: "GAME OVER", SUB_TITLE: "시간 초과" },
  DEATH: { TITLE: "GAME OVER", SUB_TITLE: "생명 소진" },
};

const LOADING_TIPS_MESSAGES = [
  "움직이지 않아도 빛은 점점 줄어듭니다.",
  "토끼가 길을 계산하고 있어요.",
  "발판 스위치는 한 번에 하나의 문만 열 수 있어요!",
  "조금만 기다려주세요, 토끼가 준비 중이에요!",
  "토끼는 여전히 탈출구를 찾고 있습니다.",
  "시간이 다 되면 빛이 완전히 사라집니다...",
  "가시는 즉시 큰 피해를 줍니다. 조심히 이동하세요.",
  "무언가 느껴진다면 출구가 가까운 걸지도 몰라요!",
  "발판 스위치를 밟고 있으면 무언가 작동할지도 몰라요!",
];

export { GAME_RESULT_MESSAGE, LOADING_TIPS_MESSAGES };
