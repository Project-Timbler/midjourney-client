/// <reference types="node" />
import { DiscordMessage } from "./DiscordMessage.js";
import { CommandCache } from "./CommandCache.js";
import type { InteractionName } from "./models.js";
import { APIButtonComponentWithCustomId, EventEmitter } from "../deps.js";
import type { RESTGetAPIChannelMessagesQuery, Snowflake } from "../deps.js";
import { PWall } from "./PWall.js";
export type UploadSlot = {
    id: number;
    upload_filename: string;
    upload_url: string;
};
export interface WaitOptions {
    prompt?: string | string[];
    name?: string;
    maxWait?: number;
    interactionOriginal?: InteractionName;
    interaction?: InteractionName;
    imgId?: 1 | 2 | 3 | 4 | string;
    startId?: Snowflake;
    parentId?: Snowflake;
    progress?: (percent: number) => void;
}
export interface WaitOptionsProgress extends WaitOptions {
    progress: (percent: number) => void;
}
export declare class Midjourney {
    #private;
    readonly auth: string;
    readonly application_id: string;
    /**
     * server id
     */
    private _guild_id;
    /**
     * channel id
     */
    private _channel_id;
    readonly session_id: string;
    properties: {
        os: string;
        browser: string;
        device: string;
        system_locale: string;
        browser_user_agent: string;
        browser_version: string;
        os_version: string;
        referrer: string;
        referring_domain: string;
        referrer_current: string;
        referring_domain_current: string;
        release_channel: "stable";
        client_build_number: number;
        client_event_source: null;
    };
    MAX_TIME_OFFSET: number;
    private pWall;
    /**
     * build a Midjourney client from a fetch request extracted from a discord browser message.
     * sample can be the fetch call test, or an existing filename, containing the fetch request.
     * @param sample
     */
    constructor(sample: string, options?: {
        pWall?: PWall;
    });
    get commandCache(): CommandCache;
    get guild_id(): string;
    /**
     * channel id
     */
    get channel_id(): string;
    setDiscordChannelUrl(url: `https://discord.com/channels/${number}/${number}`): void;
    private wsCnxCnt;
    private ws;
    private wsActivated;
    private wsHeartbeat;
    messageCache: Map<string, DiscordMessage>;
    MessageCacheByPrompt: Map<string, DiscordMessage[]>;
    MessageCacheByParent: Map<string, DiscordMessage[]>;
    messageEmmiter: EventEmitter;
    disconnectWs(): void;
    connectWs(): Promise<void>;
    private get headers();
    private buildPayload;
    /**
     * invoke /settings in discord bot..
     * @param params
     */
    settings(): Promise<number>;
    /**
     * enable relax mode
     */
    relax(): Promise<number>;
    /**
     * enable fast mode
     */
    fast(): Promise<number>;
    imagine(prompt: string, progress?: (percent: number) => void): Promise<DiscordMessage>;
    private describe;
    private blendInternal;
    callCustomComponents(parentId: Snowflake, button: APIButtonComponentWithCustomId, progress?: (percent: number) => void): Promise<DiscordMessage>;
    private callCustom;
    private doInteractions;
    /**
     * wait for an upscale or a Variant
     * @param comp
     */
    waitComponents(parentId: Snowflake, button: APIButtonComponentWithCustomId, maxWait?: number, progress?: (percent: number) => void): Promise<DiscordMessage>;
    private filterMessages;
    private waitMessageWs;
    private followCheckMsg;
    private followLoop;
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
    waitMessage(opts?: WaitOptions): Promise<DiscordMessage>;
    waitMessageInternal(opts: WaitOptionsProgress): Promise<DiscordMessage>;
    /**
     * get message from the chanel
     * @param params
     */
    getMessages(params?: RESTGetAPIChannelMessagesQuery): Promise<DiscordMessage[]>;
    /**
     * retrive a single message by id using the discord api get messages V10
     * @param id message Snowflake id
     * @returns the message
     */
    getMessageById(id: Snowflake): Promise<DiscordMessage>;
    /**
     * prepare an attachement to upload an image.
     */
    attachments(...files: {
        filename: string;
        file_size: number;
        id: number | string;
    }[]): Promise<{
        attachments: UploadSlot[];
    }>;
    /**
     * Upload an image to an upload slot provided by the attachments function.
     * @param slot use uploadUrl to put the image
     * @returns
     */
    uploadImage(slot: UploadSlot, data: ArrayBufferLike, contentType: string): Promise<void>;
    /**
     * invoke /describe on an image from an URL.
     * @param imageUrl url of the image
     * @return a list of 4 prompt suggested by Midjourney
     */
    describeUrl(imageUrl: string, progress?: (percent: number) => void): Promise<string[]>;
    /**
     * invoke /describe on an image provided as a buffer
     * @param filename image name
     * @param imageData the buffer containing the image
     * @param contentType the content type (can be autodetect from extention)
     * @return a list of 4 prompt suggested by Midjourney
     */
    describeImage(filename: string, imageData: ArrayBufferLike, contentType?: string, progress?: (percent: number) => void): Promise<string[]>;
    blendUrl(imageUrls: string[], dimensions?: "1:1" | "2:3" | "3:2", progress?: (percent: number) => void): Promise<DiscordMessage>;
    blend(images: {
        filename: string;
        imageData: ArrayBufferLike;
        contentType?: string;
    }[], dimensions?: "1:1" | "2:3" | "3:2", progress?: (percent: number) => void): Promise<DiscordMessage>;
}
export default Midjourney;
