const NodeCache = require("node-cache");

// Create a new instance of NodeCache
const myCache = new NodeCache();

// Use the cache instance
myCache.set("key", { first: "hello" });
myCache.set("2", { first: "everybody" });
const cachedValue = myCache.get("key");
const cachedValue2 = myCache.get("2");

console.log(cachedValue.first);
console.log(cachedValue2.first);
