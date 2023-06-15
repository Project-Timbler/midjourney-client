import type { APIApplicationCommand, APIMessageReference, APIUser, Snowflake } from "../deps.js";
import { ApplicationCommandType } from "../deps.js";
export type InteractionName = "variations" | "grid" | "upscale" | "describe" | "imagine" | "blend";
export interface Command extends APIApplicationCommand {
    name: "imagine" | "settings" | string;
    contexts?: unknown;
}
export interface Payload extends APIMessageReference {
    type: ApplicationCommandType;
    application_id: string;
    session_id: string;
    message_flags?: number;
    data: {
        version?: Snowflake;
        id?: Snowflake;
        name?: string;
        component_type?: number;
        custom_id?: string;
        type?: 1;
        options?: unknown[];
        application_command?: Command;
        attachments?: unknown[];
    };
    nonce?: string;
}
export interface UserReference extends APIUser {
    global_name: string | null;
    display_name: string | null;
    avatar_decoration: null;
    public_flags?: number;
}
