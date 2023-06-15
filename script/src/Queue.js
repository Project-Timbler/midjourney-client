"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Queue_head, _Queue_tail, _Queue_size;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
/**
 * Queue like sindresorhus/yocto-queue with an extra enqueueFirst()
 */
class Queue {
    constructor() {
        _Queue_head.set(this, void 0);
        _Queue_tail.set(this, void 0);
        _Queue_size.set(this, void 0);
        // do not call clear to avoid Typescript warnings
        __classPrivateFieldSet(this, _Queue_size, 0, "f");
    }
    enqueue(...values) {
        for (const value of values) {
            const node = { value };
            if (__classPrivateFieldGet(this, _Queue_head, "f") && __classPrivateFieldGet(this, _Queue_tail, "f")) {
                // replace the last Node
                __classPrivateFieldGet(this, _Queue_tail, "f").next = node;
                __classPrivateFieldSet(this, _Queue_tail, node, "f");
            }
            else {
                // the queue is empty
                __classPrivateFieldSet(this, _Queue_head, __classPrivateFieldSet(this, _Queue_tail, node, "f"), "f");
            }
            __classPrivateFieldSet(this, _Queue_size, __classPrivateFieldGet(this, _Queue_size, "f") + 1, "f");
        }
    }
    /**
     * pretend the queue with a new Node.
     * @param values
     */
    enqueueFirst(...values) {
        for (const value of values) {
            if (__classPrivateFieldGet(this, _Queue_head, "f") && __classPrivateFieldGet(this, _Queue_tail, "f")) {
                const node = { value, next: __classPrivateFieldGet(this, _Queue_head, "f") };
                __classPrivateFieldSet(this, _Queue_head, node, "f");
            }
            else {
                // the queue is empty
                __classPrivateFieldSet(this, _Queue_head, __classPrivateFieldSet(this, _Queue_tail, { value }, "f"), "f");
            }
            __classPrivateFieldSet(this, _Queue_size, __classPrivateFieldGet(this, _Queue_size, "f") + 1, "f");
        }
    }
    dequeue() {
        const current = __classPrivateFieldGet(this, _Queue_head, "f");
        if (!current) {
            return;
        }
        __classPrivateFieldSet(this, _Queue_head, current.next, "f");
        __classPrivateFieldSet(this, _Queue_size, __classPrivateFieldGet(this, _Queue_size, "f") - 1, "f");
        return current.value;
    }
    clear() {
        __classPrivateFieldSet(this, _Queue_head, undefined, "f");
        __classPrivateFieldSet(this, _Queue_tail, undefined, "f");
        __classPrivateFieldSet(this, _Queue_size, 0, "f");
    }
    get size() {
        return __classPrivateFieldGet(this, _Queue_size, "f");
    }
    *[(_Queue_head = new WeakMap(), _Queue_tail = new WeakMap(), _Queue_size = new WeakMap(), Symbol.iterator)]() {
        let current = __classPrivateFieldGet(this, _Queue_head, "f");
        while (current) {
            yield current.value;
            current = current.next;
        }
    }
}
exports.Queue = Queue;
