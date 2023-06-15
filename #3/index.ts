/**
 * LOGEST function.
 * https://www.statisticshowto.com/probability-and-statistics/regression-analysis/find-a-linear-regression-equation
 * http://www.exceluser.com/formulas/how-to-calculate-both-types-of-compound-growth-rates.html
 * https://www.excelfunctions.net/excel-logest-function.html
 * @param data
 */
export default function logest(ys: number[]): number {
  if (
    ys.every((y) => y === 0) ||
    ys.every((y) => y < 0) ||
    ys.includes(0) ||
    ys.some((y) => y < 0)
  ) {
    return NaN;
  }

  const n = ys.length;
  const lnYs = ys.map(Math.log);
  const sumX = (n * (n + 1)) / 2;
  const sumY = lnYs.reduce((sum, lnY) => sum + lnY, 0);
  const sumXY = lnYs.reduce((sum, lnY, i) => sum + lnY * (i + 1), 0);
  const sumXsquared = (n * (n + 1) * (2 * n + 1)) / 6;

  const b = (n * sumXY - sumX * sumY) / (n * sumXsquared - sumX ** 2);

  return Math.exp(b);
}
