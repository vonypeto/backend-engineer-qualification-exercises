"use strict";
exports.__esModule = true;
var _1 = require(".");
function calculateLogest(ys) {
    var result = (0, _1["default"])(ys);
    return result;
}
var logestResult;
var ys1 = [1, 2, 3, 4, 5];
logestResult = calculateLogest(ys1);
console.log(logestResult);
var ys2 = [-5, -4, -3, -2, -1];
logestResult = calculateLogest(ys2);
console.log(logestResult);
var ys3 = [5, 4, 0, 2, 1];
logestResult = calculateLogest(ys3);
console.log(logestResult);
var ys4 = [5, -4, 3, 2, 1];
logestResult = calculateLogest(ys4);
console.log(logestResult);
var ys5 = [5, 4, 3, 2, 1];
logestResult = calculateLogest(ys5);
console.log(logestResult);
