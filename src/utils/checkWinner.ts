export const checkWinner = (gameState: any) => {
  const getSectionOf2DArray = (arr: any, sectionFunc: any) =>
    Array.prototype.concat.apply(
      [],
      arr.map((row: any, i: any) => row.filter((_: any, j: any) => sectionFunc(i, j)))
    );

  const rowLines = (array: any) => Array(array.length).fill(0).map((_, k) => (i: any, j: any) => i === k);

  const colLines = (array: any) => Array(array.length).fill(0).map((_, k) => (i: any, j: any) => j === k);

  const leftDiag = (array: any) => (i: any, j: any) => i === j;
  const rightDiag = (array: any) => (i: any, j: any) => i + j === array.length - 1;

  const ourLines = (array: any) =>
    rowLines(array)
      .concat(colLines(array))
      .concat(leftDiag(array))
      .concat(rightDiag(array));

  const win = (evalLine: any) => new Set(evalLine).size === 1 && evalLine[0] !== null;

  const winResults = (array: any) => ourLines(array).map(line => win(getSectionOf2DArray(array, line)));

  const isThereAWin = (array: any) => winResults(array).includes(true);

  return isThereAWin(gameState);
}