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
var _PWall_intervalMs, _PWall_next, _PWall_queue;
import { Queue } from "./Queue.js";
export class PWall {
    constructor(intervalMs) {
        _PWall_intervalMs.set(this, void 0);
        _PWall_next.set(this, void 0);
        _PWall_queue.set(this, void 0);
        Object.defineProperty(this, "releaseNext", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const r = __classPrivateFieldGet(this, _PWall_queue, "f").dequeue();
                if (r) {
                    r();
                }
                if (__classPrivateFieldGet(this, _PWall_queue, "f").size) {
                    __classPrivateFieldSet(this, _PWall_next, setTimeout(this.releaseNext, __classPrivateFieldGet(this, _PWall_intervalMs, "f")), "f");
                }
                else {
                    __classPrivateFieldSet(this, _PWall_next, undefined, "f");
                }
            }
        });
        __classPrivateFieldSet(this, _PWall_intervalMs, intervalMs, "f");
        __classPrivateFieldSet(this, _PWall_queue, new Queue(), "f");
    }
    waitForAccess() {
        if (!__classPrivateFieldGet(this, _PWall_next, "f")) {
            __classPrivateFieldSet(this, _PWall_next, setTimeout(this.releaseNext, __classPrivateFieldGet(this, _PWall_intervalMs, "f")), "f");
            return Promise.resolve();
        }
        let resolve;
        const p = new Promise((r) => resolve = r);
        __classPrivateFieldGet(this, _PWall_queue, "f").enqueue(resolve);
        return p;
    }
    get intervalMs() {
        return __classPrivateFieldGet(this, _PWall_intervalMs, "f");
    }
}
_PWall_intervalMs = new WeakMap(), _PWall_next = new WeakMap(), _PWall_queue = new WeakMap();
