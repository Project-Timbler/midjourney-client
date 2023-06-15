export declare const REROLL = "\uD83D\uDD04";
export declare const wait: (ms: number) => Promise<unknown>;
export declare function download(url: string, filename: string): Promise<{
    data: ArrayBufferLike;
    file: string;
}>;
/**
 * download or read file from disk
 */
export declare function downloadFileCached(url: string, filename: string): Promise<{
    data: ArrayBufferLike;
    file: string;
    cached: boolean;
}>;
export declare function getExistinggroup(text: string, fallback_env: string, ...regs: RegExp[]): string;
export declare function filename2Mime(filename: string): string;
export declare function generateRandomString(length: number): string;
