import logest from ".";

function calculateLogest(ys: number[]): number {
  const result = logest(ys);
  return result;
}
let logestResult;
const ys1 = [1, 2, 3, 4, 5];
logestResult = calculateLogest(ys1);
console.log(logestResult);

const ys2 = [-5, -4, -3, -2, -1];
logestResult = calculateLogest(ys2);
console.log(logestResult);
const ys3 = [5, 4, 0, 2, 1];
logestResult = calculateLogest(ys3);
console.log(logestResult);
const ys4 = [5, -4, 3, 2, 1];
logestResult = calculateLogest(ys4);
console.log(logestResult);
const ys5 = [5, 4, 3, 2, 1];
logestResult = calculateLogest(ys5);
console.log(logestResult);
