import { DateTime } from "luxon";
import R from "ramda";
import fs from "fs";
/**
 * Calculates the ratio between the amount of time when status is AVAILABLE and
 * the amount of time between startDateTime inclusive and endDateTime exclusive.
 * @param startDateTime
 * @param endDateTime
 */
export function availability(startDateTime: Date, endDateTime: Date): number {
  const data = require("./data.json");

  const startTime = startDateTime.getTime();
  const endTime = endDateTime.getTime();
  let availableDuration = 0;

  for (const entry of data) {
    const entryTime = new Date(entry.timestamp).getTime();

    if (entryTime >= startTime && entryTime < endTime) {
      if (entry.status === "AVAILABLE") {
        availableDuration++;
      }
    }
  }

  const totalDuration = (endTime - startTime) / (1000 * 60);

  return availableDuration / totalDuration;
}
/**
 * Generates the outages between startDateTime inclusive and endDateTime exclusive.
 * An outage is PARTIAL if the status within the period is PARTIALLY_AVAILABLE.
 * Similarly, an outage is MAJOR if the status within the period is UNAVAILABLE.
 * @param startDateTime
 * @param endDateTime
 */
export function outages(
  startDateTime: Date,
  endDateTime: Date
): { type: "PARTIAL" | "MAJOR"; timestamp: Date; duration: number }[] {
  const data = require("./data.json");
  const outages: {
    type: "PARTIAL" | "MAJOR";
    timestamp: Date;
    duration: number;
  }[] = [];

  let outageStart: Date | null = null;
  let outageStatus: "PARTIALLY_AVAILABLE" | "UNAVAILABLE" | null = null;

  for (const item of data) {
    const timestamp = new Date(item.timestamp);
    if (timestamp >= startDateTime && timestamp < endDateTime) {
      if (outageStatus !== item.status) {
        if (outageStart && outageStatus) {
          const outageEnd = timestamp;
          const duration = Math.round(
            (outageEnd.getTime() - outageStart.getTime()) / 60000 // Convert milliseconds to minutes
          );

          outages.push({
            type: outageStatus === "PARTIALLY_AVAILABLE" ? "PARTIAL" : "MAJOR",
            timestamp: outageStart,
            duration: duration,
          });
        }

        outageStart = timestamp;
        outageStatus = item.status === "AVAILABLE" ? null : item.status;
      }
    }
  }

  if (outageStart && outageStatus) {
    const outageEnd = endDateTime;
    const duration = Math.round(
      (outageEnd.getTime() - outageStart.getTime()) / 60000 // Convert milliseconds to minutes
    );

    outages.push({
      type: outageStatus === "PARTIALLY_AVAILABLE" ? "PARTIAL" : "MAJOR",
      timestamp: outageStart,
      duration: duration,
    });
  }

  return outages;
}
