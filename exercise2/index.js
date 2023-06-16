"use strict";
exports.__esModule = true;
exports.outages = exports.availability = void 0;
/**
 * Calculates the ratio between the amount of time when status is AVAILABLE and
 * the amount of time between startDateTime inclusive and endDateTime exclusive.
 * @param startDateTime
 * @param endDateTime
 */
function availability(startDateTime, endDateTime) {
    var data = require("./data.json");
    var startTime = startDateTime.getTime();
    var endTime = endDateTime.getTime();
    var availableDuration = 0;
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var entry = data_1[_i];
        var entryTime = new Date(entry.timestamp).getTime();
        if (entryTime >= startTime && entryTime < endTime) {
            if (entry.status === "AVAILABLE") {
                availableDuration++;
            }
        }
    }
    var totalDuration = (endTime - startTime) / (1000 * 60);
    return availableDuration / totalDuration;
}
exports.availability = availability;
/**
 * Generates the outages between startDateTime inclusive and endDateTime exclusive.
 * An outage is PARTIAL if the status within the period is PARTIALLY_AVAILABLE.
 * Similarly, an outage is MAJOR if the status within the period is UNAVAILABLE.
 * @param startDateTime
 * @param endDateTime
 */
function outages(startDateTime, endDateTime) {
    var data = require("./data.json");
    var outages = [];
    var outageStart = null;
    var outageStatus = null;
    for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
        var item = data_2[_i];
        var timestamp = new Date(item.timestamp);
        if (timestamp >= startDateTime && timestamp < endDateTime) {
            if (outageStatus !== item.status) {
                if (outageStart && outageStatus) {
                    var outageEnd = timestamp;
                    var duration = Math.round((outageEnd.getTime() - outageStart.getTime()) / 60000 // Convert milliseconds to minutes
                    );
                    outages.push({
                        type: outageStatus === "PARTIALLY_AVAILABLE" ? "PARTIAL" : "MAJOR",
                        timestamp: outageStart,
                        duration: duration
                    });
                }
                outageStart = timestamp;
                outageStatus = item.status === "AVAILABLE" ? null : item.status;
            }
        }
    }
    if (outageStart && outageStatus) {
        var outageEnd = endDateTime;
        var duration = Math.round((outageEnd.getTime() - outageStart.getTime()) / 60000 // Convert milliseconds to minutes
        );
        outages.push({
            type: outageStatus === "PARTIALLY_AVAILABLE" ? "PARTIAL" : "MAJOR",
            timestamp: outageStart,
            duration: duration
        });
    }
    return outages;
}
exports.outages = outages;
