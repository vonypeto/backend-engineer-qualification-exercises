import CacheHandler from ".";

// Instantiate an instance of the CacheHandler class
async function main() {
  const cache = new CacheHandler(async (arg: string) => {
    // Simulate some asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Return a value based on the input argument
    return `Processed: ${arg}`;
  }, 5000);

  const result = await cache.exec("hello");
  console.log(result);
}
// Call main function
main().catch((error) => {
  console.error(error);
});
