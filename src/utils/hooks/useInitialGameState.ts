export const useInitialGameState = () => {
  var initialGameState: any[] = [];
  for (let i = 0; i < 7; i++) {
    initialGameState[i] = [];
    for (let j = 0; j < 7; j++) {
      initialGameState[i][j] = null;
    }
  }
  return initialGameState;
}