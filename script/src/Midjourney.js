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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Midjourney_commandCache;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Midjourney = void 0;
const dntShim = __importStar(require("../_dnt.shims.js"));
const DiscordMessage_js_1 = require("./DiscordMessage.js");
const SnowflakeObj_js_1 = require("./SnowflakeObj.js");
// import * as cmd from "./applicationCommand.ts";
const CommandCache_js_1 = require("./CommandCache.js");
const deps_js_1 = require("../deps.js");
// import MsgsCache from "./MsgsCache.ts";
const deps_js_2 = require("../deps.js");
const utils_js_1 = require("./utils.js");
const wsMessages_js_1 = require("./wsMessages.js");
const PWall_js_1 = require("./PWall.js");
const interactions = "https://discord.com/api/v9/interactions";
// export type WaitOptions = Exclude<WaitOptionsProgress, 'progress'> & Partial<Pick<WaitOptionsProgress, 'progress'>>;
class Midjourney {
    /**
     * build a Midjourney client from a fetch request extracted from a discord browser message.
     * sample can be the fetch call test, or an existing filename, containing the fetch request.
     * @param sample
     */
    constructor(sample, options = {}) {
        Object.defineProperty(this, "auth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "application_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * server id
         */
        Object.defineProperty(this, "_guild_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        /**
         * channel id
         */
        Object.defineProperty(this, "_channel_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "session_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        _Midjourney_commandCache.set(this, void 0);
        Object.defineProperty(this, "properties", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { ...wsMessages_js_1.properties }
        });
        // readonly DISCORD_TOKEN: string;
        // readonly DISCORD_BOTID: string;
        // readonly cookie: string;
        //readonly x_super_properties: string;
        //readonly x_discord_locale: string;
        Object.defineProperty(this, "MAX_TIME_OFFSET", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 10 * 1000
        });
        Object.defineProperty(this, "pWall", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // public async connectDiscordBot(): Promise<void> {
        //   if (!this.DISCORD_TOKEN) {
        //     throw Error("no DISCORD_TOKEN available");
        //   }
        //   const client = new DiscordJs.Client({
        //     intents: [ DiscordJs.GatewayIntentBits.Guilds], // , DiscordJs.GatewayIntentBits.GuildMessages
        //   });
        //   client.on("ready", () => {
        //     if (client.user) {
        //       logger.info(`Logged in as ${client.user.tag}!`);
        //     }
        //   });
        //   // client.on("message", (msg) => {
        //   //   if (msg.content === "ping") msg.reply("pong");
        //   // });
        //   client.on('interactionCreate', async interaction => {
        //     if (!interaction.isChatInputCommand()) return;
        //
        //     if (interaction.commandName === 'ping') {
        //       await interaction.reply('Pong!');
        //     }
        //   });
        //   logger.info('login... ', this.DISCORD_TOKEN)
        //   const resp = await client.login(this.DISCORD_TOKEN);
        //   logger.info('done:', resp);
        // }
        Object.defineProperty(this, "wsCnxCnt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "ws", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "wsActivated", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "wsHeartbeat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "messageCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "MessageCacheByPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "MessageCacheByParent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "messageEmmiter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new deps_js_1.EventEmitter()
        });
        this.pWall = options.pWall || new PWall_js_1.PWall(2000); // limit may be 1500 + second limit after 3 request.
        if (!sample.includes("{")) {
            // use sample as a filename
            sample = dntShim.Deno.readTextFileSync(sample);
        }
        sample = sample.replace(/\\"/g, '"');
        this.application_id = "936929561302675456";
        try {
            this._guild_id = (0, utils_js_1.getExistinggroup)(sample, "SERVER_ID", /"guild_id":\s?"(\d+)"/, /SERVER_ID\s*=\s*"?([0-9]+)"?/);
        }
        catch (_e) {
            // ignore
        }
        try {
            this._channel_id = (0, utils_js_1.getExistinggroup)(sample, "CHANNEL_ID", /"channel_id":\s?"(\d+)"/, /CHANNEL_ID\s*=\s*"?([0-9]+)"?/);
        }
        catch (_e) {
            // ignore
        }
        this.session_id = (0, utils_js_1.generateRandomString)(32);
        if (!this._guild_id && !this._channel_id && sample.length === 72) {
            this.auth = sample;
        }
        else {
            this.auth = (0, utils_js_1.getExistinggroup)(sample, "SALAI_TOKEN", /"authorization":\s?"([^"]+)"/, /SALAI_TOKEN\s*=\s*"?([_A-Za-z0-9.]+)"?/);
        }
    }
    get commandCache() {
        if (!__classPrivateFieldGet(this, _Midjourney_commandCache, "f")) {
            __classPrivateFieldSet(this, _Midjourney_commandCache, new CommandCache_js_1.CommandCache(this._channel_id, this.auth), "f");
        }
        return __classPrivateFieldGet(this, _Midjourney_commandCache, "f");
    }
    get guild_id() {
        return this._guild_id;
    }
    /**
     * channel id
     */
    get channel_id() {
        return this._channel_id;
    }
    setDiscordChannelUrl(url) {
        const ids = url.split("/").filter((a) => a.match(/^\d+$/));
        if (ids.length != 2) {
            throw Error("invalid url discord channels urls looks like https://discord.com/channels/1234567890/1234567890");
        }
        this._guild_id = ids[0];
        this._channel_id = ids[1];
    }
    disconnectWs() {
        if (this.wsHeartbeat) {
            clearTimeout(this.wsHeartbeat);
            this.wsHeartbeat = null;
        }
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.wsActivated = false;
    }
    async connectWs() {
        if (this.ws && this.wsActivated) {
            return;
        }
        let heartbeat_interval = 10000;
        this.ws = new WebSocket("wss://gateway.discord.gg/?encoding=json&v=9");
        this.wsCnxCnt++;
        if (this.wsCnxCnt === 0) {
            // getMessages(params: RESTGetAPIChannelMessagesQuery = {}, ): Promise<DiscordMessage[]>
        }
        const send = (json) => {
            const asString = JSON.stringify(json);
            // console.log(`SND `, pc.red(asString));
            if (this.ws)
                this.ws.send(asString);
        };
        const doHeartbeat = () => {
            // console.log(`ping ${cnt} in ${heartbeat_interval}ms`);
            send({ op: 1, d: this.wsCnxCnt });
            this.wsHeartbeat = setTimeout(doHeartbeat, heartbeat_interval);
        };
        this.ws.onopen = () => {
            if (this.ws) {
                this.ws.send(JSON.stringify({
                    op: 2,
                    d: {
                        token: this.auth,
                        capabilities: 8189,
                        properties: this.properties,
                        presence: {
                            status: "unknown",
                            since: 0,
                            activities: [],
                            afk: false,
                        },
                        compress: false,
                        client_state: {
                            guild_versions: {},
                            highest_last_message_id: "0",
                            read_state_version: 0,
                            user_guild_settings_version: -1,
                            user_settings_version: -1,
                            private_channels_version: "0",
                            api_code_version: 0,
                        },
                    },
                }));
            }
        };
        this.ws.onclose = ( /*ev: CloseEvent*/) => {
            if (this.wsActivated) {
                this.ws = null;
                if (this.wsHeartbeat) {
                    clearTimeout(this.wsHeartbeat);
                    this.wsHeartbeat = null;
                }
                this.connectWs();
            }
        };
        this.ws.onmessage = (ev) => {
            if (typeof ev.data === "string") {
                const data = JSON.parse(ev.data);
                if (data.op === wsMessages_js_1.WsOpcode.HELLO) {
                    const elm = data;
                    heartbeat_interval = elm.d.heartbeat_interval;
                    doHeartbeat();
                    return;
                }
                if (data.op === wsMessages_js_1.WsOpcode.HEARTBEAT_ACK) {
                    return;
                }
                if (data.op === wsMessages_js_1.WsOpcode.DISPATCH) {
                    // console.log(`RCV DISPATCH `, pc.green(data.t));
                    switch (data.t) {
                        case "MESSAGE_CREATE":
                        case "MESSAGE_UPDATE":
                            {
                                let discMsg = new DiscordMessage_js_1.DiscordMessage(this, data.d);
                                if (discMsg.content && !discMsg.prompt) {
                                    /// for debug only
                                    discMsg = new DiscordMessage_js_1.DiscordMessage(this, data.d);
                                    discMsg = new DiscordMessage_js_1.DiscordMessage(this, data.d);
                                }
                                this.messageEmmiter.emit("message", data.d.id, discMsg);
                            }
                            break;
                        case "MESSAGE_DELETE":
                            this.messageEmmiter.emit("message", data.d.id);
                    }
                }
            }
        };
        if (!this.wsActivated) {
            this.wsActivated = true;
            this.messageEmmiter.on("message", (id, msg) => {
                if (!msg) {
                    // console.log(`delete Msg ${pc.red(id)} from index`);
                    this.messageCache.delete(id);
                }
                else {
                    // console.log(`Index Msg ${pc.green(id)}`);
                    this.messageCache.set(id, msg);
                }
            });
            const msgs = await this.getMessages({ limit: 50 });
            msgs.forEach((msg) => this.messageEmmiter.emit("message", msg.id, msg));
        }
    }
    get headers() {
        return {
            authorization: this.auth,
            "User-Agent": "midjourney-discord-api/1.0 (WebClient; +https://github.com/UrielCh/midjourney-client)",
        };
    }
    buildPayload(cmd) {
        if (!this._guild_id || !this._channel_id) {
            throw Error('you must choose a channel first with setDiscordChannelUrl("https://discord.com/channels/......./......")');
        }
        const payload = {
            type: 2,
            application_id: this.application_id,
            guild_id: this._guild_id,
            channel_id: this._channel_id,
            session_id: this.session_id,
            data: {
                version: cmd.version,
                id: cmd.id,
                name: cmd.name,
                type: 1,
                options: [],
                application_command: cmd,
                attachments: [],
            },
        };
        return payload;
    }
    /**
     * invoke /settings in discord bot..
     * @param params
     */
    async settings() {
        await this.pWall.waitForAccess();
        const cmd = await this.commandCache.getCommand("settings");
        const payload = this.buildPayload(cmd);
        const response = await this.doInteractions(payload);
        if (response.status === 204) {
            // no content;
            return response.status;
        }
        throw new Error(`settings return ${response.status} ${response.statusText} ${await response.text()}`);
    }
    /**
     * enable relax mode
     */
    async relax() {
        await this.pWall.waitForAccess();
        const cmd = await this.commandCache.getCommand("relax");
        const payload = this.buildPayload(cmd);
        const response = await this.doInteractions(payload);
        if (response.status === 204) {
            // no content;
            return response.status;
        }
        throw new Error(`relax return ${response.status} ${response.statusText} ${await response.text()}`);
    }
    /**
     * enable fast mode
     */
    async fast() {
        await this.pWall.waitForAccess();
        const cmd = await this.commandCache.getCommand("fast");
        const payload = this.buildPayload(cmd);
        const response = await this.doInteractions(payload);
        if (response.status === 204) {
            // no content;
            return response.status;
        }
        throw new Error(`fast return ${response.status} ${response.statusText} ${await response.text()}`);
    }
    async imagine(prompt, progress) {
        await this.pWall.waitForAccess();
        const startId = new SnowflakeObj_js_1.SnowflakeObj(-this.MAX_TIME_OFFSET).encode();
        const cmd = await this.commandCache.getCommand("imagine");
        const payload = this.buildPayload(cmd);
        payload.data.options = [{ type: 3, name: "prompt", value: prompt }];
        const response = await this.doInteractions(payload);
        if (response.status === 204) {
            const msg = await this.waitMessage({
                progress,
                interaction: "imagine",
                prompt,
                startId,
                maxWait: 3000,
            });
            // console.log('imagine return msg P type', msg.parentInteraction)
            return msg;
        }
        throw new Error(`imagine return ${response.status} ${response.statusText} ${await response.text()}`);
    }
    async describe(attachment) {
        await this.pWall.waitForAccess();
        const cmd = await this.commandCache.getCommand("describe");
        const payload = this.buildPayload(cmd);
        const { id, upload_filename: uploaded_filename } = attachment;
        payload.data.options = [{ type: 11, name: "image", value: id }];
        const filename = uploaded_filename.replace(/.+\//, "");
        payload.data.attachments = [{ id, filename, uploaded_filename }];
        const response = await this.doInteractions(payload);
        if (response.status === 204) {
            // no content;
            return response.status;
        }
        throw new Error(`describe return ${response.status} ${response.statusText} ${await response.text()}`);
    }
    async blendInternal(attachments, dimensions) {
        await this.pWall.waitForAccess();
        const cmd = await this.commandCache.getCommand("blend");
        const payload = this.buildPayload(cmd);
        payload.data.attachments = [];
        payload.data.options = [];
        for (let i = 1; i <= attachments.length; i++) {
            const { id, upload_filename: uploaded_filename } = attachments[i - 1];
            const filename = uploaded_filename.replace(/.+\//, "");
            payload.data.options.push({ type: 11, name: `image${i}`, value: id });
            payload.data.attachments.push({ id, filename, uploaded_filename });
        }
        if (dimensions) {
            payload.data.options.push({
                type: 3,
                name: `dimensions`,
                value: `--ar ${dimensions}`,
            });
        }
        const response = await this.doInteractions(payload);
        if (response.status === 204) {
            // no content;
            return response.status;
        }
        throw new Error(`blend return ${response.status} ${response.statusText} ${await response.text()}`);
    }
    async callCustomComponents(parentId, button, progress) {
        await this.pWall.waitForAccess();
        if (!button.disabled && button.style !== deps_js_1.ButtonStyle.Primary) {
            await this.callCustom(parentId, button.custom_id);
        }
        else {
            deps_js_2.logger.warn(`The requested action ${button.custom_id} had already been processed, just looking for a previous result.`);
        }
        return await this.waitComponents(parentId, button, undefined, progress);
    }
    async callCustom(messageId, custom_id, message_flags = 0) {
        if (!this._guild_id || !this._channel_id) {
            throw Error('you must choose a channel first with setDiscordChannelUrl("https://discord.com/channels/......./......")');
        }
        if (!custom_id) {
            throw Error("custom_id is empty");
        }
        const payload = {
            type: deps_js_1.ApplicationCommandType.Message,
            application_id: this.application_id,
            guild_id: this._guild_id,
            channel_id: this._channel_id,
            session_id: this.session_id,
            message_flags,
            message_id: messageId,
            data: { component_type: 2, custom_id: custom_id },
        };
        const response = await this.doInteractions(payload);
        return response.status;
    }
    async doInteractions(payload) {
        const formData = new FormData();
        payload.nonce = new SnowflakeObj_js_1.SnowflakeObj().encode();
        formData.append("payload_json", JSON.stringify(payload));
        const response = await fetch(interactions, {
            method: "POST",
            body: formData,
            headers: this.headers,
        });
        return response;
    }
    /**
     * wait for an upscale or a Variant
     * @param comp
     */
    async waitComponents(parentId, button, maxWait = 360, progress) {
        let type;
        const label = button.label || button.emoji?.name || "ERROR";
        let imgId = undefined;
        if (label.startsWith("V") || label == "Make Variations") {
            type = "variations";
            imgId = ""; // image Id is not specified in title for variations.
        }
        else if (label.startsWith("U")) {
            type = "upscale";
            imgId = label;
        }
        else if (label === utils_js_1.REROLL) {
            type = undefined;
            imgId = undefined;
        }
        else {
            throw Error("waitComponents only support upscale and variations");
        }
        const waitParams = {
            progress,
            maxWait,
            interaction: type,
            startId: parentId,
            imgId: imgId,
            parentId,
        };
        // logger.info(`Waiting for`, waitParams);
        const msg = await this.waitMessage(waitParams);
        return msg;
    }
    filterMessages(opts = {}, messages) {
        let matches = messages;
        matches = matches.filter((item) => item.prompt); // keep only parssable messages;
        matches = matches.filter((item) => item.author.id === this.application_id); // keep only message from Discord bot
        if (opts.prompt) {
            // filter by prompt
            matches = matches.filter((item) => {
                const itemPrompt = item.prompt.prompt;
                if (Array.isArray(opts.prompt)) {
                    for (const elm of opts.prompt) {
                        if (!itemPrompt.includes(elm)) {
                            return false;
                        }
                    }
                    return true;
                }
                else {
                    const itemPromptLt = itemPrompt.replace(/ --[^ ]+ [.\d\w]+$/, "");
                    return opts.prompt === itemPrompt || opts.prompt === itemPromptLt;
                }
            });
        }
        if (opts.parentId) {
            matches = matches.filter((item) => item.referenced_message &&
                item.referenced_message.id === opts.parentId);
        }
        if (opts.interaction) {
            matches = matches.filter((item) => item.parentInteraction === opts.interaction);
        }
        if (opts.name) {
            matches = matches.filter((item) => item.prompt.name === opts.name);
        }
        if (opts.imgId) {
            let imgId = 0;
            if (opts.imgId) {
                if (typeof opts.imgId === "number") {
                    imgId = opts.imgId;
                }
                else {
                    imgId = Number(opts.imgId.replace(/[^0-9]+/g, ""));
                }
            }
            matches = matches.filter((item) => item.prompt.name.includes(`#${imgId}`));
        }
        if (matches.length > 1) {
            deps_js_2.logger.error("warning multiple message match your waiting request! review your criterion:", opts);
        }
        return matches;
    }
    waitMessageWs(opts) {
        if (!this.wsActivated) {
            throw Error("websocket not activated");
        }
        // console.log(pc.magenta(`waitMessageWs`), opts);
        let prevCompletion = -2;
        const matches = this.filterMessages(opts, [...this.messageCache.values()]);
        let prevMsg;
        if (matches.length) {
            prevMsg = matches[0];
            const r = this.followCheckMsg(prevMsg, prevCompletion, opts.progress);
            prevCompletion = r.completion;
            if (r.completion === 1) {
                return Promise.resolve(prevMsg);
            }
        }
        return new Promise((resolve, _reject) => {
            const listenFnc = (_msgId, msg) => {
                if (!msg) {
                    // if (opts.interaction === "blend" && prevMsg && prevMsg.id === msgId) {
                    //   opts.interaction = "imagine";
                    //   if (Array.isArray(opts.prompt)) {
                    //     opts.prompt = prevMsg.prompt!.prompt;
                    //   }
                    // }
                }
                else {
                    let matches = this.filterMessages(opts, [msg]);
                    if (!matches.length && prevMsg && prevMsg.id === msg.id) {
                        // rename search opt
                        if (opts.interactionOriginal === "blend") {
                            //if (Array.isArray(opts.prompt)) {
                            // opts.interaction = "imagine";
                            if (msg.prompt) {
                                delete opts.interaction;
                                opts.prompt = msg.prompt.prompt;
                            }
                            // }
                        }
                        matches = this.filterMessages(opts, [msg]);
                    }
                    if (matches.length) {
                        prevMsg = matches[0];
                        const r = this.followCheckMsg(matches[0], prevCompletion, opts.progress);
                        prevCompletion = r.completion;
                        if (r.completion === 1) {
                            // console.log(pc.yellow('REMOVE messageEmmiter listener'));
                            this.messageEmmiter.removeListener("message", listenFnc);
                            resolve(matches[0]);
                        }
                    }
                }
            };
            // console.log(pc.yellow('ADD messageEmmiter listener'));
            this.messageEmmiter.addListener("message", listenFnc);
        });
    }
    followCheckMsg(msg, prevCompletion, progress) {
        const prompt = msg.prompt;
        if (!prompt) {
            // FATAL
            deps_js_2.logger.error(`lose track of the current progress with message`, msg);
            throw new Error(`failed to extract prompt from ${msg.content}`);
        }
        if (prompt.completion !== undefined &&
            prevCompletion !== prompt.completion) {
            prevCompletion = prompt.completion;
            progress(prevCompletion);
        }
        return { completion: prevCompletion };
    }
    async followLoop(msg, opts, counters) {
        const msgid = msg.id;
        let prevCompletion = -2;
        const { maxWait = 1000 } = opts;
        counters.hit = true;
        deps_js_2.logger.info(`waitMessage for prompt message found`, msgid, msg.content);
        for (let i = 0; i < maxWait; i++) {
            const ret = this.followCheckMsg(msg, prevCompletion, opts.progress);
            prevCompletion = ret.completion;
            if (prevCompletion === 1)
                return msg; // exit loop
            await (0, utils_js_1.wait)(1000);
            try {
                msg = await this.getMessageById(msgid);
            }
            catch (_) {
                // the next pass will be a blend
                if (opts.interaction === "blend") {
                    opts.interaction = "imagine";
                    if (Array.isArray(opts.prompt)) {
                        opts.prompt = msg.prompt.prompt;
                    }
                }
                return null;
            }
            counters.hitRefresh++;
        }
        return null;
    }
    /**
     * Wait for a message in the channel using a multiple cryteria, critera can be:
     * - prompt: requested prompt
     * - name: used as filename for /describe
     * - maxWait: max wait iteration
     * - type: what kind of resond are you waiting for, can be "variations" | "grid" | "upscale" | "describe"
     * - imgId: use for upscale, can be 1 2 3 or 4
     * - startId: do not look for message older than the initial request.
     * - parent: filter by parent request
     */
    waitMessage(opts = {}) {
        if (!opts.progress) {
            opts.progress = (percent) => {
                if (percent < 0) {
                    deps_js_2.logger.info(`wait for the prompt in Queue`);
                }
                else if (percent === 1) {
                    deps_js_2.logger.info(`waitMessage found a 100% process done message`);
                }
                else {
                    deps_js_2.logger.info(`follow message completion: (${(percent * 100).toFixed(0)}%)`);
                }
            };
        }
        return this.waitMessageInternal(opts);
    }
    async waitMessageInternal(opts) {
        if (this.wsActivated) {
            return this.waitMessageWs(opts);
            // use websocket
        }
        const counters = {
            request: 0,
            message: 0,
            hit: false,
            hitRefresh: 0,
        };
        let { maxWait = 1000 } = opts;
        let startId = opts.startId || "";
        /** called once the correct message had been located */
        const lookFor = async (messages) => {
            counters.message += messages.length;
            // maintain the last message Id;
            messages.forEach((item) => {
                if (item.id > startId)
                    startId = item.id;
            });
            const matches = this.filterMessages(opts, messages);
            if (!matches.length)
                return null;
            const m2 = await this.followLoop(matches[0], opts, counters);
            return m2;
        };
        const limit = startId ? 100 : 50;
        if (maxWait === 0) {
            maxWait = 1;
        }
        for (let i = 0; i < maxWait; i++) {
            const msgs = await this.getMessages({
                limit,
                after: startId,
            });
            counters.request++;
            if (i == 0 && startId) {
                deps_js_2.logger.info(`waitMessage 1st request gets ${msgs.length} messages, Will retry one per sec up to ${maxWait} times`);
            }
            else {
                if (msgs.length) {
                    deps_js_2.logger.info(`waitMessage ${i}th request gets ${msgs.length} messages`);
                }
            }
            // debugging get back in time and get the previous msg
            // if (msg.length === 0) {
            //   msg = await this.getMessages({
            //     limit: 1,
            //   });
            //   console.log(msg[0]);
            // }
            if (msgs.length) {
                const results = await lookFor(msgs);
                if (results)
                    return results;
            }
            await (0, utils_js_1.wait)(1000);
        }
        if (counters.hit) {
            throw Error(`waitMessage failed without finding the expected message after ${counters.request} requests, ${counters.message} messaages tested`);
        }
        throw Error(`waitMessage still waiting for a 100% processed status after ${counters.hitRefresh} refresh`);
    }
    /**
     * get message from the chanel
     * @param params
     */
    async getMessages(params = {}) {
        const url = new URL(`https://discord.com/api/v10/channels/${this._channel_id}/messages`);
        const searchParams = new URLSearchParams(url.search); // generic import prev params
        for (const [key, value] of Object.entries(params)) {
            const strValue = value.toString();
            if (strValue)
                searchParams.set(key, strValue);
        }
        url.search = searchParams.toString();
        const response = await fetch(url.toString(), { headers: this.headers });
        if (response.status === 200) {
            const msgs = (await response.json());
            // msgs.forEach((msg) => MsgsCache.set(msg.id, msg));
            return msgs.map((msg) => new DiscordMessage_js_1.DiscordMessage(this, msg));
        }
        throw new Error(`getMessages return ${response.status} ${response.statusText} ${await response.text()}`);
    }
    /**
     * retrive a single message by id using the discord api get messages V10
     * @param id message Snowflake id
     * @returns the message
     */
    async getMessageById(id) {
        // "Only bots can use this endpoint"
        //if (false) {
        //    const url = `https://discord.com/api/v12/channels/${this.channel_id}/messages/${id}`;
        //    const response = await fetch(url, {
        //        method: "GET",
        //        headers: this.headers,
        //    });
        //    if (response.status === 200) {
        //        return response.json();
        //    }
        //    throw new Error(response.statusText + ' ' + await response.text());
        //} else {
        // use retrieveMessages instead of get messages
        const datas = await this.getMessages({
            around: id,
            limit: 1,
        });
        if (!datas.length) {
            throw new Error(`no message found, around ${id}`);
        }
        const [data] = datas;
        if (data.id !== id) {
            throw new Error(`the message ${id} had been removed`);
        }
        return datas[0];
        // }
    }
    /**
     * prepare an attachement to upload an image.
     */
    async attachments(...files) {
        const headers = { ...this.headers, "content-type": "application/json" };
        const url = new URL(`https://discord.com/api/v9/channels/${this._channel_id}/attachments`);
        const body = { files }; //  [{ filename, file_size, id }]
        // filename: "aaaa.jpeg", file_size: 66618, id: "16"
        const response = await fetch(url.toString(), {
            headers,
            method: "POST",
            body: JSON.stringify(body),
        });
        if (response.status === 200) {
            const atts = (await response.json());
            return atts;
        }
        throw new Error(`Attachments return ${response.status} ${response.statusText} ${await response.text()}`);
    }
    /**
     * Upload an image to an upload slot provided by the attachments function.
     * @param slot use uploadUrl to put the image
     * @returns
     */
    async uploadImage(slot, data, contentType) {
        const headers = { "content-type": contentType };
        const response = await fetch(slot.upload_url, {
            method: "PUT",
            headers,
            body: new Uint8Array(data),
        });
        if (!response.ok) {
            throw new Error(`uploadImage return ${response.status} ${response.statusText} ${await response.text()}`);
        }
    }
    /**
     * invoke /describe on an image from an URL.
     * @param imageUrl url of the image
     * @return a list of 4 prompt suggested by Midjourney
     */
    async describeUrl(imageUrl, progress) {
        const url = new URL(imageUrl);
        const filename = url.pathname.replaceAll(/\//g, "_").replace(/^_/, ""); // "pixelSample.webp";
        const imageData = await (0, utils_js_1.download)(imageUrl, filename);
        if (!imageData) {
            throw Error("download failed");
        }
        return this.describeImage(filename, imageData.data, undefined, progress);
    }
    /**
     * invoke /describe on an image provided as a buffer
     * @param filename image name
     * @param imageData the buffer containing the image
     * @param contentType the content type (can be autodetect from extention)
     * @return a list of 4 prompt suggested by Midjourney
     */
    async describeImage(filename, imageData, contentType, progress) {
        await this.pWall.waitForAccess();
        contentType = contentType || (0, utils_js_1.filename2Mime)(filename);
        const id = Date.now();
        // accept up to 5 sec offset
        const startId = new SnowflakeObj_js_1.SnowflakeObj(-this.MAX_TIME_OFFSET).encode();
        const { attachments } = await this.attachments({
            filename,
            file_size: imageData.byteLength,
            id,
        });
        const [attachment] = attachments;
        await this.uploadImage(attachment, imageData, contentType);
        await this.describe(attachment);
        const realfilename = filename.replace(/^_/, "");
        for (let i = 0;; i++) {
            try {
                const msg = await this.waitMessage({
                    progress,
                    interaction: "describe",
                    name: realfilename,
                    maxWait: 1,
                    startId,
                });
                if (msg.prompt) {
                    return msg.prompt.prompt.split(/\n+/g).map((p) => p.slice(4));
                }
            }
            catch (e) {
                if (i > 5) {
                    throw e;
                }
            }
        }
    }
    async blendUrl(imageUrls, dimensions, progress) {
        const images = await Promise.all(imageUrls.map(async (imageUrl) => {
            const url = new URL(imageUrl);
            const filename = url.pathname.replaceAll(/\//g, "_").replace(/^_/, ""); // "pixelSample.webp";
            const imageData = await (0, utils_js_1.download)(imageUrl, filename);
            if (!imageData) {
                throw Error("download failed");
            }
            return {
                filename,
                imageData: imageData.data,
            };
        }));
        if (!images) {
            throw Error("download failed");
        }
        return this.blend(images, dimensions, progress);
    }
    async blend(images, dimensions = "1:1", progress) {
        await this.pWall.waitForAccess();
        images.forEach((image) => (image.contentType = image.contentType || (0, utils_js_1.filename2Mime)(image.filename)));
        const id0 = Date.now();
        const startId = new SnowflakeObj_js_1.SnowflakeObj(-this.MAX_TIME_OFFSET).encode();
        const { attachments } = await this.attachments(...images.map((img, id) => ({
            filename: img.filename,
            file_size: img.imageData.byteLength,
            id: id0 + id,
        })));
        for (let i = 0; i < images.length; i++) {
            await this.uploadImage(attachments[i], images[i].imageData, images[i].contentType || "");
        }
        // const [attachment] = attachments;
        const status = await this.blendInternal(attachments, dimensions);
        const identifier = attachments.map((a) => a.upload_filename.replace(/.+\//, ""));
        // identifier.push("https://s.mj.run");
        // https://cdn.discordapp.com/ephemeral-attachments/'
        if (dimensions) {
            identifier.push(`--ar ${dimensions}`);
        }
        if (status === 204) {
            const msg = await this.waitMessage({
                progress,
                interactionOriginal: "blend",
                interaction: "blend",
                prompt: identifier,
                startId,
                maxWait: 3000,
            });
            return msg;
        }
        throw Error("Wait for blend response failed");
    }
}
exports.Midjourney = Midjourney;
_Midjourney_commandCache = new WeakMap();
exports.default = Midjourney;
