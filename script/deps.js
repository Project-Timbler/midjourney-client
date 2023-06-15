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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = exports.exists = exports.path = exports.pc = exports.logger = exports.MessageType = exports.MessageFlags = exports.ButtonStyle = exports.ApplicationCommandType = void 0;
var v9_1 = require("discord-api-types/v9");
Object.defineProperty(exports, "ApplicationCommandType", { enumerable: true, get: function () { return v9_1.ApplicationCommandType; } });
Object.defineProperty(exports, "ButtonStyle", { enumerable: true, get: function () { return v9_1.ButtonStyle; } });
Object.defineProperty(exports, "MessageFlags", { enumerable: true, get: function () { return v9_1.MessageFlags; } });
Object.defineProperty(exports, "MessageType", { enumerable: true, get: function () { return v9_1.MessageType; } });
const logger_1 = __importDefault(require("@denodnt/logger"));
exports.logger = new logger_1.default();
exports.pc = __importStar(require("./deps/deno.land/std@0.189.0/fmt/colors.js"));
exports.path = __importStar(require("./deps/deno.land/std@0.189.0/path/mod.js"));
var exists_js_1 = require("./deps/deno.land/std@0.189.0/fs/exists.js");
Object.defineProperty(exports, "exists", { enumerable: true, get: function () { return exists_js_1.exists; } });
var events_1 = require("events");
Object.defineProperty(exports, "EventEmitter", { enumerable: true, get: function () { return events_1.EventEmitter; } });
