let prevTimestamp = 0;
let prevIncrement = 0;
export class SnowflakeObj {
    /**
     * build a snowflake:
     * if no arg passed return a new unique snowflake timestampted now.
     * if an negative number is passed, return snowflake timestampted passed value ms ago.
     * if an positive number is passed, return snowflake timestampted with the given value.
     * if a string is passed, the strind will be read as a snowflake string.
     * @param snowflake
     */
    constructor(snowflake) {
        Object.defineProperty(this, "timestamp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "workerId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "processId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "increment", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (!snowflake) {
            this.timestamp = Date.now();
            this.workerId = 0;
            this.processId = 0;
            if (prevTimestamp !== this.timestamp) {
                prevTimestamp = this.timestamp;
                prevIncrement = 0;
            }
            else {
                prevIncrement++;
            }
            this.increment = prevIncrement;
        }
        else if (typeof snowflake === "number") {
            if (snowflake < 0) {
                snowflake = Date.now() + snowflake;
            }
            this.timestamp = snowflake;
            this.workerId = 0;
            this.processId = 0;
            this.increment = 0;
        }
        else {
            const snowflakeInt = BigInt(snowflake);
            this.timestamp = Number((snowflakeInt >> 22n) + 1420070400000n);
            this.workerId = Number((snowflakeInt & 0x3e0000n) >> 17n);
            this.processId = Number((snowflakeInt & 0x1f000n) >> 12n);
            this.increment = Number(snowflakeInt & 0xfffn);
        }
    }
    get date() {
        return new Date(this.timestamp);
    }
    encode() {
        const timestampPart = BigInt(this.timestamp - 1420070400000) << 22n;
        const workerIdPart = BigInt(this.workerId) << 17n;
        const processIdPart = BigInt(this.processId) << 12n;
        const incrementPart = BigInt(this.increment);
        const snowflakeInt = timestampPart | workerIdPart | processIdPart |
            incrementPart;
        return snowflakeInt.toString();
    }
    toString() {
        return `date:${this.date.toISOString()} worker:${this.workerId} process:${this.processId} increment:${this.increment}`;
    }
}
