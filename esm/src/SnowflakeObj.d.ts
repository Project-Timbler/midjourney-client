import { type Snowflake } from "../deps.js";
export declare class SnowflakeObj {
    timestamp: number;
    workerId: number;
    processId: number;
    increment: number;
    /**
     * build a snowflake:
     * if no arg passed return a new unique snowflake timestampted now.
     * if an negative number is passed, return snowflake timestampted passed value ms ago.
     * if an positive number is passed, return snowflake timestampted with the given value.
     * if a string is passed, the strind will be read as a snowflake string.
     * @param snowflake
     */
    constructor(snowflake?: Snowflake | number);
    get date(): Date;
    encode(): Snowflake;
    toString(): string;
}
