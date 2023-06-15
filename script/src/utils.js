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
exports.generateRandomString = exports.filename2Mime = exports.getExistinggroup = exports.downloadFileCached = exports.download = exports.wait = exports.REROLL = void 0;
const dntShim = __importStar(require("../_dnt.shims.js"));
const deps_js_1 = require("../deps.js");
exports.REROLL = "🔄";
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.wait = wait;
async function download(url, filename) {
    const data = await (await fetch(url)).arrayBuffer();
    if (filename) {
        deps_js_1.logger.info(`saving downloaded file to ${filename}`);
        await dntShim.Deno.writeFile(filename, new Uint8Array(data));
    }
    return { data, file: filename };
}
exports.download = download;
/**
 * download or read file from disk
 */
async function downloadFileCached(url, filename) {
    try {
        const content = await dntShim.Deno.readFile(filename);
        return { data: content.buffer, file: filename, cached: true };
    }
    catch (_e) {
        return { ...await download(url, filename), cached: false };
    }
}
exports.downloadFileCached = downloadFileCached;
function getExistinggroup(text, fallback_env, ...regs) {
    for (const reg of regs) {
        const m = text.match(reg);
        if (m)
            return m[1];
    }
    if (fallback_env) {
        const envData = dntShim.Deno.env.get(fallback_env);
        if (envData) {
            return envData;
        }
    }
    const extra = fallback_env ? ` or fill the env variable: "${fallback_env}"` : "";
    throw Error(`failed to find ${regs.join(" | ")} in provided sample of size:${text.length}${extra}`);
}
exports.getExistinggroup = getExistinggroup;
function filename2Mime(filename) {
    filename = filename.toLowerCase();
    if (filename.endsWith(".webp")) {
        return "image/webp";
    }
    else if (filename.endsWith(".jpeg") || filename.endsWith(".jpg")) {
        return "image/jpeg";
    }
    else if (filename.endsWith(".png")) {
        return "image/png";
    }
    else {
        throw Error(`unknown extention in ${filename}`);
    }
}
exports.filename2Mime = filename2Mime;
function generateRandomString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.generateRandomString = generateRandomString;
