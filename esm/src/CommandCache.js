import * as dntShim from "../_dnt.shims.js";
import { logger, path } from "../deps.js";
export const KNOWN_METHODS = [
    "ask",
    "blend",
    "describe",
    "fast",
    "help",
    "imagine",
    "info",
    "invite",
    "prefer",
    "private",
    "public",
    "relax",
    "settings",
    "show",
    "stealth",
    "subscribe",
];
export class CommandCache {
    constructor(channel_id, authorization) {
        Object.defineProperty(this, "channel_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: channel_id
        });
        Object.defineProperty(this, "authorization", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: authorization
        });
        Object.defineProperty(this, "cacheDirectory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        this.cacheDirectory = "cmdCache";
        dntShim.Deno.mkdirSync(this.cacheDirectory, { recursive: true });
    }
    async getCommand(name) {
        // try from memory cache
        if (this.cache[name]) {
            return this.cache[name];
        }
        let command;
        // try from disk cache
        const cacheFile = this.getcacheFile(name);
        if (cacheFile) {
            try {
                command = JSON.parse(await dntShim.Deno.readTextFile(cacheFile));
            }
            catch (_e) {
                // failed to load command from cache.
            }
        }
        // get from discord
        if (!command) {
            logger.info(`CommandCache: ${name} not in cache, requesting Discord server.`);
            const url = `https://discord.com/api/v9/channels/${this.channel_id}/application-commands/search?type=1&query=${name}&limit=1&include_applications=false`;
            const response = await fetch(url, {
                headers: { authorization: this.authorization },
            });
            const data = (await response.json());
            if ("application_commands" in data) {
                const application_commands = data.application_commands;
                if (application_commands[0]) {
                    command = application_commands[0];
                    if (cacheFile) {
                        await dntShim.Deno.writeTextFile(cacheFile, JSON.stringify(command, undefined, 2));
                    }
                }
            }
        }
        // save in memory
        if (command) {
            this.cache[name] = command;
            return command;
        }
        throw Error(`Failed to get application_commands for command ${name}`);
    }
    getcacheFile(name) {
        if (!this.cacheDirectory)
            return "";
        return path.join(this.cacheDirectory, `${name}.json`);
    }
}
