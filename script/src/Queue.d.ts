/**
 * Queue like sindresorhus/yocto-queue with an extra enqueueFirst()
 */
export declare class Queue<T = unknown> implements Iterable<T> {
    #private;
    constructor();
    enqueue(...values: T[]): void;
    /**
     * pretend the queue with a new Node.
     * @param values
     */
    enqueueFirst(...values: T[]): void;
    dequeue(): T | void;
    clear(): void;
    get size(): number;
    [Symbol.iterator](): Iterator<T, void, undefined>;
}
