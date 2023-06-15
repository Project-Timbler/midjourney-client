"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsOpcode = exports.properties = void 0;
const browser_user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36";
const browser_version = "113.0.0.0";
exports.properties = {
    os: "Windows",
    browser: "Chrome",
    device: "",
    system_locale: "fr-FR",
    browser_user_agent,
    browser_version,
    os_version: "10",
    referrer: "https://discord.com/",
    referring_domain: "discord.com",
    referrer_current: "",
    referring_domain_current: "",
    release_channel: "stable",
    client_build_number: 198146,
    client_event_source: null,
};
exports.WsOpcode = {
    DISPATCH: 0,
    HEARTBEAT: 1,
    IDENTIFY: 2,
    PRESENCE_UPDATE: 3,
    VOICE_STATE_UPDATE: 4,
    VOICE_SERVER_PING: 5,
    RESUME: 6,
    RECONNECT: 7,
    REQUEST_GUILD_MEMBERS: 8,
    INVALID_SESSION: 9,
    HELLO: 10,
    HEARTBEAT_ACK: 11,
    CALL_CONNECT: 13,
    GUILD_SUBSCRIPTIONS: 14,
    LOBBY_CONNECT: 15,
    LOBBY_DISCONNECT: 16,
    LOBBY_VOICE_STATES_UPDATE: 17,
    STREAM_CREATE: 18,
    STREAM_DELETE: 19,
    STREAM_WATCH: 20,
    STREAM_PING: 21,
    STREAM_SET_PAUSED: 22,
    REQUEST_GUILD_APPLICATION_COMMANDS: 24,
    EMBEDDED_ACTIVITY_LAUNCH: 25,
    EMBEDDED_ACTIVITY_CLOSE: 26,
    EMBEDDED_ACTIVITY_UPDATE: 27,
    REQUEST_FORUM_UNREADS: 28,
    REMOTE_COMMAND: 29,
    GET_DELETED_ENTITY_IDS_NOT_MATCHING_HASH: 30,
    REQUEST_SOUNDBOARD_SOUNDS: 31,
    SPEED_TEST_CREATE: 32,
    SPEED_TEST_DELETE: 33,
    REQUEST_LAST_MESSAGES: 34,
};
// | WsMsg16LobbyDisconnect
// | WsMsg17LobbyVoiceStatesUpdate
// | WsMsg18StreamCreate
// | WsMsg19StreamDelete
// | WsMsg20StreamWatch
// | WsMsg21StreamPing
// | WsMsg22StreamSetPaused
// | WsMsg24RequestGuildApplicationCommands
// | WsMsg25EmbeddedActivityLaunch
// | WsMsg26EmbeddedActivityClose
// | WsMsg27EmbeddedActivityUpdate
// | WsMsg28RequestForumUnreads
// | WsMsg29RemoteCommand
// | WsMsg30GetDeletedEntityIdsNotMatchingHash
// | WsMsg31RequestSoundboardSounds
// | WsMsg32SpeedTestCreate
// | WsMsg33SpeedTestDelete
// | WsMsg34RequestLastMessages
