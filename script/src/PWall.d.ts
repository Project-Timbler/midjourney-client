export declare class PWall {
    #private;
    constructor(intervalMs: number);
    waitForAccess(): Promise<void>;
    private releaseNext;
    get intervalMs(): number;
}
