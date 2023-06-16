"use strict";
exports.__esModule = true;
/**
 * LOGEST function.
 * https://www.statisticshowto.com/probability-and-statistics/regression-analysis/find-a-linear-regression-equation
 * http://www.exceluser.com/formulas/how-to-calculate-both-types-of-compound-growth-rates.html
 * https://www.excelfunctions.net/excel-logest-function.html
 * @param data
 */
function logest(ys) {
    if (ys.every(function (y) { return y === 0; }) ||
        ys.every(function (y) { return y < 0; }) ||
        ys.includes(0) ||
        ys.some(function (y) { return y < 0; })) {
        return NaN;
    }
    var n = ys.length;
    var lnYs = ys.map(Math.log);
    var sumX = (n * (n + 1)) / 2;
    var sumY = lnYs.reduce(function (sum, lnY) { return sum + lnY; }, 0);
    var sumXY = lnYs.reduce(function (sum, lnY, i) { return sum + lnY * (i + 1); }, 0);
    var sumXsquared = (n * (n + 1) * (2 * n + 1)) / 6;
    var b = (n * sumXY - sumX * sumY) / (n * sumXsquared - Math.pow(sumX, 2));
    return Math.exp(b);
}
exports["default"] = logest;
