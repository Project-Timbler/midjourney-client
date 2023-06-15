"use strict";
/**
 * # midjourney-discord-api
 *
 * @module
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIDJOURNEY_CHANNELS = exports.DiscordMessage = exports.SnowflakeObj = exports.Midjourney = exports.default = void 0;
var Midjourney_js_1 = require("./src/Midjourney.js");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(Midjourney_js_1).default; } });
var Midjourney_js_2 = require("./src/Midjourney.js");
Object.defineProperty(exports, "Midjourney", { enumerable: true, get: function () { return __importDefault(Midjourney_js_2).default; } });
var SnowflakeObj_js_1 = require("./src/SnowflakeObj.js");
Object.defineProperty(exports, "SnowflakeObj", { enumerable: true, get: function () { return SnowflakeObj_js_1.SnowflakeObj; } });
var DiscordMessage_js_1 = require("./src/DiscordMessage.js");
Object.defineProperty(exports, "DiscordMessage", { enumerable: true, get: function () { return DiscordMessage_js_1.DiscordMessage; } });
var Constants_js_1 = require("./src/Constants.js");
Object.defineProperty(exports, "MIDJOURNEY_CHANNELS", { enumerable: true, get: function () { return Constants_js_1.MIDJOURNEY_CHANNELS; } });
