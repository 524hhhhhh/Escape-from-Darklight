function sliceFrame(frame: number, cols: number) {
  const col = frame % cols;
  const row = Math.floor(frame / cols);
  return { col, row };
}

function buildPingPongFrames(maxFramIndex: number) {
  const frames: number[] = [];
  for (let frameIndex = 0; frameIndex <= maxFramIndex; frameIndex++) {
    frames.push(frameIndex);
  }

  for (let frameIndex = maxFramIndex - 1; frameIndex >= 0; frameIndex--) {
    frames.push(frameIndex);
  }

  return frames;
}

export { sliceFrame, buildPingPongFrames };
