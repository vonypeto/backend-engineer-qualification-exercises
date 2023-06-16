import { availability, outages } from ".";

const startDateTime = new Date("2023-06-15T09:00:00");
const endDateTime = new Date("2023-06-15T17:00:00");
const cases: {
  input: Parameters<typeof outages>;
  output: ReturnType<typeof outages>;
}[] = [
  {
    input: [
      new Date("2020-03-01T00:00:00.000Z"),
      new Date("2020-03-02T00:00:00.000Z"),
    ],
    output: [],
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
        duration: 31,
      },
      {
        type: "PARTIAL",
        timestamp: new Date("2020-03-06T06:55:00.000Z"),
        duration: 15,
      },
    ],
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
        duration: 31,
      },
      {
        type: "PARTIAL",
        timestamp: new Date("2020-03-06T06:55:00.000Z"),
        duration: 15,
      },
      {
        type: "MAJOR",
        timestamp: new Date("2020-03-21T03:45:00.000Z"),
        duration: 90,
      },
      {
        type: "PARTIAL",
        timestamp: new Date("2020-03-21T05:15:00.000Z"),
        duration: 30,
      },
      {
        type: "PARTIAL",
        timestamp: new Date("2020-03-26T16:15:00.000Z"),
        duration: 10,
      },
    ],
  },
];
const result1 = availability(startDateTime, endDateTime);
console.log(result1);

const result2 = outages(startDateTime, endDateTime);
console.log(result2);
for (const { input, output } of cases) {
  outages.apply(null, input);
  console.log(outages.apply(null, input));
  // console.log(output);
}
