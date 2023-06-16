import express, { Response } from "express";
import NodeCache from "node-cache";
import { availability, outages } from "./exercise2";
import logest from "./exercise3";

// Create a new instance of NodeCache
const myCache = new NodeCache();

// Use the cache instance

const app = express();
const port = 5000;

app.get("/", (res: Response) => {
  res.send("Hello, TypeScript server!");
});

app.get("/setcache", (res: Response) => {
  myCache.set("key", { first: "hello" });
  myCache.set("2", { first: "everybody" });

  res.send("set cache");
});

app.get("/getcache", (res: Response) => {
  const cachedValue = myCache.get<{ first: string }>("key");
  const cachedValue2 = myCache.get<{ first: string }>("2");

  console.log(cachedValue?.first);
  console.log(cachedValue2?.first);
  res.send({ cachedValue, cachedValue2 } || { cache: "not found" });
});

app.get("/avail", (res: Response) => {
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
  let resultOutsideLoop;

  for (const { input } of cases) {
    outages.apply(null, input);
    console.log(outages.apply(null, input));
    // console.log(output);
    resultOutsideLoop = outages.apply(null, input);
  }
  res.send({ result1, resultOutsideLoop });
});

app.get("/ys", (res: Response) => {
  function calculateLogest(ys: number[]): number {
    const result = logest(ys);
    return result;
  }
  const resultsArray = [];

  const ys1 = [1, 2, 3, 4, 5];
  const logestResult1 = calculateLogest(ys1);
  resultsArray.push(logestResult1);

  const ys2 = [-5, -4, -3, -2, -1];
  const logestResult2 = calculateLogest(ys2);
  resultsArray.push(logestResult2);

  const ys3 = [5, 4, 0, 2, 1];
  const logestResult3 = calculateLogest(ys3);
  resultsArray.push(logestResult3);

  const ys4 = [5, -4, 3, 2, 1];
  const logestResult4 = calculateLogest(ys4);
  resultsArray.push(logestResult4);

  const ys5 = [5, 4, 3, 2, 1];
  const logestResult5 = calculateLogest(ys5);
  resultsArray.push(logestResult5);
  res.send({ resultsArray });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
