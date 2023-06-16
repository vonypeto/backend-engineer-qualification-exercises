import NodeCache from "node-cache";

export default class CacheHandler<
  TInput extends Array<any> = Array<any>,
  TOutput = any
> {
  private cache: NodeCache;

  constructor(
    private handler: (...args: TInput) => Promise<TOutput>,
    private timeout?: number
  ) {
    this.cache = new NodeCache({ stdTTL: timeout });
  }

  async exec(...args: TInput): Promise<TOutput> {
    const key = JSON.stringify(args);

    if (this.cache.has(key)) {
      return this.cache.get<TOutput>(key)!;
    }

    const promise = this.handler(...args);
    this.cache.set(key, promise);

    if (this.timeout) {
      setTimeout(() => {
        this.cache.del(key);
      }, this.timeout);
    }

    return promise;
  }
}
