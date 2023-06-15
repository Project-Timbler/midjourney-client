var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DiscordMessage_client;
//TYPES IMPORTS
import * as dntShim from "../_dnt.shims.js";
// CODE imports
import { ButtonStyle, logger, path, pc } from "../deps.js";
import { downloadFileCached, REROLL } from "./utils.js";
const progressionQueue = -1;
const progressionStoped = -1;
export function extractPrompt(content, id) {
    if (!content) {
        return undefined;
    }
    const result = {
        // id?: string;
        // mode?: "fast" | "relaxed";
        // completion?: number; // 0..1
        // completion: -1,
        source: "",
        prompt: "",
        name: "",
    };
    let extra = content;
    /**
     * speed first
     */
    if (extra.endsWith(" (fast)")) {
        result.mode = "fast";
        extra = extra.substring(0, extra.length - 7);
    }
    else if (extra.endsWith(" (relaxed)")) {
        result.mode = "relaxed";
        extra = extra.substring(0, extra.length - 10);
    }
    else if (extra.endsWith(" (fast, stealth)")) {
        result.mode = "fast, stealth";
        extra = extra.substring(0, extra.length - 16);
    }
    else if (extra.endsWith(" (relaxed, stealth)")) {
        result.mode = "relaxed, stealth";
        extra = extra.substring(0, extra.length - 19);
    }
    /**
     * progression
     */
    if (extra.endsWith(" (paused)")) {
        extra = extra.substring(0, extra.length - 9);
        result.completion = progressionQueue;
    }
    else if (extra.endsWith(" (Stopped)")) {
        extra = extra.substring(0, extra.length - 10);
        result.completion = progressionStoped;
    }
    else if (extra.endsWith(" (Open on website for full quality)")) {
        extra = extra.substring(0, extra.length - 35);
        result.completion = 1;
    }
    else if (extra.endsWith(" (Waiting to start)")) {
        extra = extra.substring(0, extra.length - 19);
        result.completion = progressionQueue;
    }
    else {
        const extractPercent = extra.match(/ \(([0-9]+)%\)$/);
        if (extractPercent) {
            extra = extra.substring(0, extra.length - extractPercent[0].length);
            result.completion = parseInt(extractPercent[1]) / 100;
        }
    }
    /**
     * prefix
     */
    if (extra.startsWith("Making variations for image #")) {
        const prefix = extra.match(/^Making variations for image #(\d) with prompt /);
        if (prefix) {
            result.name = prefix[1];
            extra = extra.substring(prefix[0].length);
        }
    }
    const extractId = extra.match(/ <@(\d+)>$/);
    if (extractId) {
        extra = extra.substring(0, extra.length - extractId[0].length);
        result.id = extractId[1];
    }
    // can be present befor the <@id>
    if (extra.endsWith(" Upscaled by")) {
        extra = extra.substring(0, extra.length - 12);
        if (result.completion === undefined) {
            result.completion = 1; // Upscaled are only display at completion
        }
    }
    else if (extra.endsWith(" Variations by")) {
        extra = extra.substring(0, extra.length - 14);
        if (result.completion === undefined) {
            result.completion = 1; // Variations are only display at completion
        }
    }
    else if (extra.endsWith(" Upscaled (Beta) by")) {
        extra = extra.substring(0, extra.length - 19);
        if (result.completion === undefined) {
            result.completion = 1; // Variations are only display at completion
        }
    }
    else if (extra.endsWith(" Upscaled (Max) by")) {
        extra = extra.substring(0, extra.length - 18);
        if (result.completion === undefined) {
            result.completion = 1; // Variations are only display at completion
        }
    }
    else if (extra.endsWith(" Upscaled (Light) by")) {
        extra = extra.substring(0, extra.length - 20);
        if (result.completion === undefined) {
            result.completion = 1; // Variations are only display at completion
        }
    }
    else if (extra.endsWith(" Remix by")) {
        extra = extra.substring(0, extra.length - 9);
        if (result.completion === undefined) {
            result.completion = 1;
        }
    }
    else if (extra.endsWith(" Remaster by")) {
        extra = extra.substring(0, extra.length - 12);
        if (result.completion === undefined) {
            result.completion = 1;
        }
    }
    else if (extra.endsWith("** -")) {
        if (result.completion === undefined) {
            result.completion = 1; // imagen on blend
        }
    }
    {
        const tailImage = extra.match(/ Image #(\d)$/);
        if (tailImage) {
            extra = extra.substring(0, extra.length - tailImage[0].length);
            result.source = tailImage[0].trim();
            result.completion = 1; // upscall have no progress
        }
    }
    if (extra.endsWith("** -")) {
        extra = extra.substring(0, extra.length - 2);
    }
    if (extra.startsWith("**") && extra.endsWith("**") && extra.length > 4) {
        result.prompt = extra.substring(2, extra.length - 2);
        return result;
    }
    if (id === "936929561302675456") {
        logger.warn(`Failed to extract prompt data from: ${pc.yellow(content)}`);
        logger.warn(`Extra data:"${pc.yellow(extra)}"`);
    }
}
export class DiscordMessage {
    constructor(client, source) {
        /**
         * ID of the message
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * ID of the channel the message was sent in
         */
        Object.defineProperty(this, "channel_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The author of this message (only a valid user in the case where the message is generated by a user or bot user)
         *
         * If the message is generated by a webhook, the author object corresponds to the webhook's id,
         * username, and avatar. You can tell if a message is generated by a webhook by checking for the `webhook_id` property
         *
         * See https://discord.com/developers/docs/resources/user#user-object
         */
        Object.defineProperty(this, "author", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Contents of the message
         *
         * The `MESSAGE_CONTENT` privileged gateway intent will become required after **August 31, 2022** for verified applications to receive a non-empty value from this field
         *
         * In the Discord Developers Portal, you need to enable the toggle of this intent of your application in **Bot > Privileged Gateway Intents**
         *
         * See https://support-dev.discord.com/hc/articles/4404772028055
         */
        Object.defineProperty(this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * When this message was sent
         */
        Object.defineProperty(this, "timestamp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * When this message was edited (or null if never)
         */
        Object.defineProperty(this, "edited_timestamp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this was a TTS message
         */
        Object.defineProperty(this, "tts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this message mentions everyone
         */
        Object.defineProperty(this, "mention_everyone", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Users specifically mentioned in the message
         *
         * The `member` field is only present in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events
         * from text-based guild channels
         *
         * See https://discord.com/developers/docs/resources/user#user-object
         * See https://discord.com/developers/docs/resources/guild#guild-member-object
         */
        Object.defineProperty(this, "mentions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); // extention from APIUser
        /**
         * Roles specifically mentioned in this message
         *
         * See https://discord.com/developers/docs/topics/permissions#role-object
         */
        Object.defineProperty(this, "mention_roles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Any attached files
         *
         * See https://discord.com/developers/docs/resources/channel#attachment-object
         *
         * The `MESSAGE_CONTENT` privileged gateway intent will become required after **August 31, 2022** for verified applications to receive a non-empty value from this field
         *
         * In the Discord Developers Portal, you need to enable the toggle of this intent of your application in **Bot > Privileged Gateway Intents**
         *
         * See https://support-dev.discord.com/hc/articles/4404772028055
         */
        Object.defineProperty(this, "attachments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Any embedded content
         *
         * See https://discord.com/developers/docs/resources/channel#embed-object
         *
         * The `MESSAGE_CONTENT` privileged gateway intent will become required after **August 31, 2022** for verified applications to receive a non-empty value from this field
         *
         * In the Discord Developers Portal, you need to enable the toggle of this intent of your application in **Bot > Privileged Gateway Intents**
         *
         * See https://support-dev.discord.com/hc/articles/4404772028055
         */
        Object.defineProperty(this, "embeds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether this message is pinned
         */
        Object.defineProperty(this, "pinned", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Type of message
         *
         * See https://discord.com/developers/docs/resources/channel#message-object-message-types
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Message flags combined as a bitfield
         *
         * See https://discord.com/developers/docs/resources/channel#message-object-message-flags
         *
         * See https://en.wikipedia.org/wiki/Bit_field
         */
        Object.defineProperty(this, "flags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        }); //MessageFlags;
        /**
         * Sent if the message is a response to an Interaction
         */
        Object.defineProperty(this, "interaction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Sent if a thread was started from this message
         */
        Object.defineProperty(this, "thread", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Sent if the message contains components like buttons, action rows, or other interactive components
         *
         * The `MESSAGE_CONTENT` privileged gateway intent will become required after **August 31, 2022** for verified applications to receive a non-empty value from this field
         *
         * In the Discord Developers Portal, you need to enable the toggle of this intent of your application in **Bot > Privileged Gateway Intents**
         *
         * See https://support-dev.discord.com/hc/articles/4404772028055
         */
        Object.defineProperty(this, "components", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The message associated with the `message_reference`
         *
         * This field is only returned for messages with a `type` of `19` (REPLY).
         *
         * If the message is a reply but the `referenced_message` field is not present,
         * the backend did not attempt to fetch the message that was being replied to,
         * so its state is unknown.
         *
         * If the field exists but is `null`, the referenced message was deleted
         *
         * See https://discord.com/developers/docs/resources/channel#message-object
         */
        Object.defineProperty(this, "referenced_message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "prompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * parent client
         */
        _DiscordMessage_client.set(this, void 0);
        Object.assign(this, source);
        __classPrivateFieldSet(this, _DiscordMessage_client, client, "f");
        // this.id = source.id;
        this.prompt = extractPrompt(source.content, source.author?.id);
        this.content = source.content;
        if (source.referenced_message) {
            this.referenced_message = new DiscordMessage(client, source.referenced_message);
        }
        // labels: '1️⃣2️⃣3️⃣4️⃣🔄'
        // const labels = this.components.map(a => a.label).join('');
        // const custom_ids = this.components.map((a) => a.custom_id).join("");
        if (source.interaction) {
            const name = source.interaction.name;
            if (name === "describe") {
                if (source.embeds && source.embeds[0]) {
                    const embeds = source.embeds[0];
                    if (embeds.image) {
                        const description = embeds.description || "";
                        this.prompt = {
                            source: description,
                            name: embeds.image.url.replace(/.+\//, ""),
                            prompt: description,
                            completion: 1,
                        };
                    }
                }
                else {
                    // embeds not available yet.
                    this.prompt = {
                        source: "",
                        name: "",
                        prompt: "",
                        completion: -1,
                    };
                }
            }
            else if (name === "imagine") {
                // empty
            }
            else if (name === "blend") {
                // empty
            }
            else {
                logger.info("interaction Name: ", name, this.prompt);
                // console.log("interaction source.embeds: ", source.embeds);
            }
        }
        //if (custom_ids.includes("MJ::Job::PicReader::")) {
    }
    get componentsNames() {
        const out = [];
        if (!this.components) {
            return out;
        }
        for (const component of this.components) {
            const line = component.components
                .map((a) => a.label)
                .filter((a) => a);
            out.push(...line);
        }
        return out;
    }
    get parentInteraction() {
        if (this.interaction && this.interaction.name) {
            return this.interaction.name;
        }
        if (this.components && this.components.length) {
            const sig1 = this.componentsNames.join("");
            // [0].components.map((a) => (a as { label: string }).label).join("");
            if (sig1 === "U1V1" || sig1.includes("U1U2")) {
                // U3U4
                if (this.referenced_message &&
                    this.referenced_message.parentInteraction === "imagine") {
                    return "variations";
                }
                if (this.prompt) {
                    // "<https://s.mj.run/abcd> <https://s.mj.run/abcd> --ar 2:3 --v 5.1"
                    let prompt = this.prompt.prompt;
                    prompt = prompt.replace(/ --s [0-9]+$/, "");
                    prompt = prompt.replace(/ --(v|niji) [0-9.]+$/, "");
                    prompt = prompt.replace(/ --ar [:0-9]+$/, "");
                    const urls = prompt.split(" ");
                    const u2 = urls
                        .map((a) => !a.match(/<https:\/\/s\.mj\.run\/[\w\d]+>/))
                        .filter((a) => a);
                    if (u2.length === 0 && urls.length > 1) {
                        return "blend";
                    }
                }
                return "imagine";
            }
            // Make VariationsDetailed Upscale RedoBeta Upscale RedoRemasterWeb
            if (sig1.includes("Make VariationsWeb") ||
                sig1.includes("Make VariationsLight Upscale") ||
                sig1.includes("Make VariationsDetailed Upscale")) {
                return "upscale";
            }
            // if (sig1 === 'Make VariationsRemasterWeb') {
            //   return "upscale";
            // }
            if (this.prompt && this.prompt.source.startsWith("Image #")) {
                return "upscale";
            }
            if (sig1.includes("Cancel Job")) {
                console.error("parsing Cancel Job:", this.content);
                return "";
                //return "imagine";
            }
            console.error(`FIXME: can not Identify signature ${pc.green(sig1)} in message: ${pc.green(this.id)}`);
        }
        return "";
    }
    getComponents(label, label2) {
        if (!this.components) {
            throw Error("no components In this message.");
        }
        const availableLabels = [];
        for (const src of this.components) {
            for (const c of src.components) {
                if (!("custom_id" in c))
                    continue;
                if ("label" in c && c.label && c.label) {
                    if (c.label === label)
                        return c;
                    if (label2 && c.label === label2) {
                        return c;
                    }
                    availableLabels.push(c.label);
                }
                else if ("emoji" in c && c.emoji && c.emoji.name) {
                    if (c.emoji.name === label) {
                        return c;
                    }
                    if (label2 && c.emoji.name === label2) {
                        return c;
                    }
                    availableLabels.push(`${c.emoji.name}`);
                }
            }
        }
        throw Error(`Failed to find componant named "${label}" within ${availableLabels
            .map((a) => `"${a}"`)
            .join(", ")}`);
    }
    /**
     * return if the the Message is upscalable, if an id is provide, will return true only if the requested action had not already been started.
     */
    canReroll() {
        try {
            return this.getComponents(REROLL);
        }
        catch (_) {
            return null;
        }
    }
    /**
     * return if the the Message is upscalable, if an id is provide, will return true only if the requested action had not already been started.
     */
    canUpscale(id) {
        const selector = id ? `U${id}` : "U1";
        try {
            const c = this.getComponents(selector);
            if (id) {
                if (!c.disabled && c.style !== ButtonStyle.Primary) {
                    // 1 is primary button means that it had already been click
                    return c;
                }
                return null;
            }
            return c;
        }
        catch (_) {
            if (id && (id > 4 || id < 0)) {
                logger.warn(`You asked for a image id out of bound [1,2,3,4]`);
            }
            return null;
        }
    }
    /**
     * return if the the Message can be varaint, if an id is provide, will return true only if the requested action had not already been started.
     */
    canVariant(id) {
        const selector = id ? `V${id}` : "V1";
        try {
            const c = this.getComponents(selector, "Make Variations");
            if (id) {
                if (!c.disabled && c.style !== ButtonStyle.Primary) {
                    return c;
                }
                return null; // 1 is primary button means that it had already been click
            }
            return c;
        }
        catch (_) {
            if (id && (id > 4 || id < 0)) {
                logger.warn(`You asked for a image id out of bound [1,2,3,4]`);
            }
            return null;
        }
    }
    reroll(progress) {
        const comp = this.getComponents(REROLL);
        logger.info(`${comp.custom_id} Reroll will be generated`);
        return __classPrivateFieldGet(this, _DiscordMessage_client, "f").callCustomComponents(this.id, comp, progress);
    }
    upscale(id, progress) {
        const comp = this.getComponents(`U${id}`);
        logger.info(`${comp.custom_id} Upscale will be generated`);
        return __classPrivateFieldGet(this, _DiscordMessage_client, "f").callCustomComponents(this.id, comp, progress);
    }
    variant(id, progress) {
        const comp = this.getComponents(`V${id}`, "Make Variations");
        logger.info(`${comp.custom_id} Variant will be generated`);
        return __classPrivateFieldGet(this, _DiscordMessage_client, "f").callCustomComponents(this.id, comp, progress);
    }
    async refresh() {
        const m2 = await __classPrivateFieldGet(this, _DiscordMessage_client, "f").getMessageById(this.id);
        if (m2) {
            Object.assign(this, m2);
        }
        return this;
    }
    // async waitForattachements(timeout = 10): Promise<void> {
    //   for (let i = 0; i < timeout; i++) {
    //     if (!this.attachments || !this.attachments.length) {
    //       await wait(600);
    //       await this.refresh();
    //       console.log("Failed to get Attachement.");
    //     } else {
    //       break;
    //     }
    //   }
    // }
    async download(attachementId, dest) {
        // await this.waitForattachements();
        const att = (this.attachments || [])[attachementId];
        if (!att) {
            return null;
        }
        try {
            const stats = await dntShim.Deno.stat(dest);
            if (stats.isDirectory) {
                const destFile = path.join(dest, att.filename);
                logger.info(`downloading ${att.url} to ${destFile}`);
                return await downloadFileCached(att.url, destFile);
            }
            throw Error(`download abort, ${dest} is an existing file`);
        }
        catch (_) {
            if (path.basename(dest).includes(".")) {
                return await downloadFileCached(att.url, dest);
            }
            else {
                await dntShim.Deno.mkdir(dest, { recursive: true });
                return this.download(attachementId, dest);
            }
        }
    }
}
_DiscordMessage_client = new WeakMap();
