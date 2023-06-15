"use strict";
exports.__esModule = true;
var _1 = require(".");
var startDateTime = new Date("2023-06-15T09:00:00");
var endDateTime = new Date("2023-06-15T17:00:00");
var cases = [
    {
        input: [
            new Date("2020-03-01T00:00:00.000Z"),
            new Date("2020-03-02T00:00:00.000Z"),
        ],
        output: []
    },
    {
        input: [
            new Date("2020-03-06T00:00:00.000Z"),
            new Date("2020-03-07T00:00:00.000Z"),
        ],
        output: [
            {
                type: "MAJOR",
                timestamp: new Date("2020-03-06T06:24:00.000Z"),
                duration: 31
            },
            {
                type: "PARTIAL",
                timestamp: new Date("2020-03-06T06:55:00.000Z"),
                duration: 15
            },
        ]
    },
    {
        input: [
            new Date("2020-03-01T00:00:00.000Z"),
            new Date("2020-04-01T00:00:00.000Z"),
        ],
        output: [
            {
                type: "MAJOR",
                timestamp: new Date("2020-03-06T06:24:00.000Z"),
                duration: 31
            },
            {
                type: "PARTIAL",
                timestamp: new Date("2020-03-06T06:55:00.000Z"),
                duration: 15
            },
            {
                type: "MAJOR",
                timestamp: new Date("2020-03-21T03:45:00.000Z"),
                duration: 90
            },
            {
                type: "PARTIAL",
                timestamp: new Date("2020-03-21T05:15:00.000Z"),
                duration: 30
            },
            {
                type: "PARTIAL",
                timestamp: new Date("2020-03-26T16:15:00.000Z"),
                duration: 10
            },
        ]
    },
];
var result1 = (0, _1.availability)(startDateTime, endDateTime);
console.log(result1);
var result2 = (0, _1.outages)(startDateTime, endDateTime);
console.log(result2);
for (var _i = 0, cases_1 = cases; _i < cases_1.length; _i++) {
    var _a = cases_1[_i], input = _a.input, output = _a.output;
    _1.outages.apply(null, input);
    console.log(_1.outages.apply(null, input));
    // console.log(output);
}
