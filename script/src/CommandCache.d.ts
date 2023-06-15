import { Command } from "./models.js";
export declare const KNOWN_METHODS: readonly ["ask", "blend", "describe", "fast", "help", "imagine", "info", "invite", "prefer", "private", "public", "relax", "settings", "show", "stealth", "subscribe"];
export type KnownMethods = typeof KNOWN_METHODS[number];
export declare class CommandCache {
    private channel_id;
    private authorization;
    cacheDirectory?: string;
    cache: Partial<Record<KnownMethods, Command>>;
    constructor(channel_id: string, authorization: string);
    getCommand(name: KnownMethods): Promise<Command>;
    getcacheFile(name: KnownMethods): string;
}
