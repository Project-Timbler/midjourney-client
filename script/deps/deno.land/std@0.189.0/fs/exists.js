"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existsSync = exports.exists = void 0;
// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
const dntShim = __importStar(require("../../../../_dnt.shims.js"));
/**
 * Test whether or not the given path exists by checking with the file system. Please consider to check if the path is readable and either a file or a directory by providing additional `options`:
 *
 * ```ts
 * import { exists } from "https://deno.land/std@$STD_VERSION/fs/mod.ts";
 * const isReadableDir = await exists("./foo", {
 *   isReadable: true,
 *   isDirectory: true
 * });
 * const isReadableFile = await exists("./bar", {
 *   isReadable: true,
 *   isFile: true
 * });
 * ```
 *
 * Note: Do not use this function if performing a check before another operation on that file. Doing so creates a race condition. Instead, perform the actual file operation directly.
 *
 * Bad:
 * ```ts
 * import { exists } from "https://deno.land/std@$STD_VERSION/fs/mod.ts";
 *
 * if (await exists("./foo")) {
 *   await Deno.remove("./foo");
 * }
 * ```
 *
 * Good:
 * ```ts
 * // Notice no use of exists
 * try {
 *   await Deno.remove("./foo", { recursive: true });
 * } catch (error) {
 *   if (!(error instanceof Deno.errors.NotFound)) {
 *     throw error;
 *   }
 *   // Do nothing...
 * }
 * ```
 * @see https://en.wikipedia.org/wiki/Time-of-check_to_time-of-use
 */
async function exists(path, options) {
    try {
        const stat = await dntShim.Deno.stat(path);
        if (options &&
            (options.isReadable || options.isDirectory || options.isFile)) {
            if (options.isDirectory && options.isFile) {
                throw new TypeError("ExistsOptions.options.isDirectory and ExistsOptions.options.isFile must not be true together.");
            }
            if ((options.isDirectory && !stat.isDirectory) ||
                (options.isFile && !stat.isFile)) {
                return false;
            }
            if (options.isReadable) {
                if (stat.mode == null) {
                    return true; // Exclusive on Non-POSIX systems
                }
                if (dntShim.Deno.uid() == stat.uid) {
                    return (stat.mode & 0o400) == 0o400; // User is owner and can read?
                }
                else if (dntShim.Deno.gid() == stat.gid) {
                    return (stat.mode & 0o040) == 0o040; // User group is owner and can read?
                }
                return (stat.mode & 0o004) == 0o004; // Others can read?
            }
        }
        return true;
    }
    catch (error) {
        if (error instanceof dntShim.Deno.errors.NotFound) {
            return false;
        }
        if (error instanceof dntShim.Deno.errors.PermissionDenied) {
            if ((await dntShim.Deno.permissions.query({ name: "read", path })).state ===
                "granted") {
                // --allow-read not missing
                return !options?.isReadable; // PermissionDenied was raised by file system, so the item exists, but can't be read
            }
        }
        throw error;
    }
}
exports.exists = exists;
/**
 * Test whether or not the given path exists by checking with the file system. Please consider to check if the path is readable and either a file or a directory by providing additional `options`:
 *
 * ```ts
 * import { existsSync } from "https://deno.land/std@$STD_VERSION/fs/mod.ts";
 * const isReadableDir = existsSync("./foo", {
 *   isReadable: true,
 *   isDirectory: true
 * });
 * const isReadableFile = existsSync("./bar", {
 *   isReadable: true,
 *   isFile: true
 * });
 * ```
 *
 * Note: do not use this function if performing a check before another operation on that file. Doing so creates a race condition. Instead, perform the actual file operation directly.
 *
 * Bad:
 * ```ts
 * import { existsSync } from "https://deno.land/std@$STD_VERSION/fs/mod.ts";
 *
 * if (existsSync("./foo")) {
 *   Deno.removeSync("./foo");
 * }
 * ```
 *
 * Good:
 * ```ts
 * // Notice no use of existsSync
 * try {
 *   Deno.removeSync("./foo", { recursive: true });
 * } catch (error) {
 *   if (!(error instanceof Deno.errors.NotFound)) {
 *     throw error;
 *   }
 *   // Do nothing...
 * }
 * ```
 * @see https://en.wikipedia.org/wiki/Time-of-check_to_time-of-use
 */
function existsSync(path, options) {
    try {
        const stat = dntShim.Deno.statSync(path);
        if (options &&
            (options.isReadable || options.isDirectory || options.isFile)) {
            if (options.isDirectory && options.isFile) {
                throw new TypeError("ExistsOptions.options.isDirectory and ExistsOptions.options.isFile must not be true together.");
            }
            if ((options.isDirectory && !stat.isDirectory) ||
                (options.isFile && !stat.isFile)) {
                return false;
            }
            if (options.isReadable) {
                if (stat.mode == null) {
                    return true; // Exclusive on Non-POSIX systems
                }
                if (dntShim.Deno.uid() == stat.uid) {
                    return (stat.mode & 0o400) == 0o400; // User is owner and can read?
                }
                else if (dntShim.Deno.gid() == stat.gid) {
                    return (stat.mode & 0o040) == 0o040; // User group is owner and can read?
                }
                return (stat.mode & 0o004) == 0o004; // Others can read?
            }
        }
        return true;
    }
    catch (error) {
        if (error instanceof dntShim.Deno.errors.NotFound) {
            return false;
        }
        if (error instanceof dntShim.Deno.errors.PermissionDenied) {
            if (dntShim.Deno.permissions.querySync({ name: "read", path }).state === "granted") {
                // --allow-read not missing
                return !options?.isReadable; // PermissionDenied was raised by file system, so the item exists, but can't be read
            }
        }
        throw error;
    }
}
exports.existsSync = existsSync;
