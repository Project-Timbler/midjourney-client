import { WsMsg0Dispatch } from "./WsMessageDispatch.js";
export interface WsProperties {
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
}
export declare const properties: WsProperties;
export declare const WsOpcode: {
    readonly DISPATCH: 0;
    readonly HEARTBEAT: 1;
    readonly IDENTIFY: 2;
    readonly PRESENCE_UPDATE: 3;
    readonly VOICE_STATE_UPDATE: 4;
    readonly VOICE_SERVER_PING: 5;
    readonly RESUME: 6;
    readonly RECONNECT: 7;
    readonly REQUEST_GUILD_MEMBERS: 8;
    readonly INVALID_SESSION: 9;
    readonly HELLO: 10;
    readonly HEARTBEAT_ACK: 11;
    readonly CALL_CONNECT: 13;
    readonly GUILD_SUBSCRIPTIONS: 14;
    readonly LOBBY_CONNECT: 15;
    readonly LOBBY_DISCONNECT: 16;
    readonly LOBBY_VOICE_STATES_UPDATE: 17;
    readonly STREAM_CREATE: 18;
    readonly STREAM_DELETE: 19;
    readonly STREAM_WATCH: 20;
    readonly STREAM_PING: 21;
    readonly STREAM_SET_PAUSED: 22;
    readonly REQUEST_GUILD_APPLICATION_COMMANDS: 24;
    readonly EMBEDDED_ACTIVITY_LAUNCH: 25;
    readonly EMBEDDED_ACTIVITY_CLOSE: 26;
    readonly EMBEDDED_ACTIVITY_UPDATE: 27;
    readonly REQUEST_FORUM_UNREADS: 28;
    readonly REMOTE_COMMAND: 29;
    readonly GET_DELETED_ENTITY_IDS_NOT_MATCHING_HASH: 30;
    readonly REQUEST_SOUNDBOARD_SOUNDS: 31;
    readonly SPEED_TEST_CREATE: 32;
    readonly SPEED_TEST_DELETE: 33;
    readonly REQUEST_LAST_MESSAGES: 34;
};
export interface WsMsg1Heartbeat {
    op: 1;
    d: number;
}
/**
 * IDENTIFY
 */
export interface WsMsg2Identify {
    op: 2;
    d: {
        token: string;
        capabilities: number;
        properties: WsProperties;
        presence: {
            status: "online" | "unknown";
            since: 0;
            activities: [];
            afk: boolean;
        };
        compress: boolean;
        client_state: {
            guild_versions: unknown;
            highest_last_message_id: "0";
            read_state_version: 0;
            user_guild_settings_version: -1;
            user_settings_version: -1;
            private_channels_version: "0";
            api_code_version: 0;
        };
    };
}
/**
 * PRESENCE_UPDATE
 */
export interface WsMsg3PresenceUpdate {
    op: 3;
    d: {
        status: "online" | "unknown";
        since: 0;
        activities: [];
        afk: boolean;
    };
}
/**
 * VOICE_STATE_UPDATE
 */
export interface WsMsg4VoiceStateUpadate {
    op: 4;
    d: {
        guild_id: string | null;
        channel_id: string | null;
        self_mute: string | true;
        self_deaf: string | false;
        self_video: string | false;
        flags: string | 2;
    };
}
/**
 * VOICE_SERVER_PING
 */
export interface WsMsg5ServerPing {
    op: 5;
    d: unknown;
}
/**
 * RESUME
 */
export interface WsMsg6Resume {
    op: 6;
    d: {
        token: string;
        session_id: string;
        seq: number;
    };
}
export interface WsMsg9InvalidSession {
    t: null;
    s: null;
    op: 9;
    d: false;
}
export interface WsMsg10Hello {
    t: null;
    s: null;
    op: 10;
    d: {
        heartbeat_interval: 41250;
        _trace: ['["gateway-prd-us-east1-b-wwpd",{"micros":0.0}]'];
    };
}
export interface WsMsg11HeartbeatAck {
    op: 11;
    t: null;
    s: null;
    d: null;
}
export interface WsMsg14GuildSubscriptions {
    op: 14;
    d: {
        guild_id: string;
        typing: true;
        threads: true;
        activities: true;
        members: [];
        channels: unknown;
        thread_member_lists: [];
    };
}
export type WsMessage = WsMsg0Dispatch | WsMsg1Heartbeat | WsMsg2Identify | WsMsg3PresenceUpdate | WsMsg4VoiceStateUpadate | WsMsg5ServerPing | WsMsg6Resume | WsMsg9InvalidSession | WsMsg10Hello | WsMsg11HeartbeatAck | WsMsg14GuildSubscriptions;
