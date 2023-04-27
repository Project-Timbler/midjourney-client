import { SnowflakeObj } from "./SnowflakeObj.ts";
import * as cmd from "./applicationCommand.ts";
import { Command, ComponentsSummary, DiscodMessage, DiscodMessageHelper, Payload, Snowflake } from "./models.ts";
import { type RESTGetAPIChannelMessagesQuery } from "https://deno.land/x/discord_api_types@0.37.40/v10.ts";
import { ApplicationCommandType, MessageFlags } from "https://deno.land/x/discord_api_types@0.37.40/v9.ts";

function getExistinggroup(text: string, reg: RegExp): string {
    const m = text.match(reg);
    if (!m) throw Error(`failed to find ${reg} in provided sample of size:${text.length}`);
    return m[1];
}

const interactions = "https://discord.com/api/v9/interactions";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export type Message = {
    id: string;
    uri: string;
    hash: string;
    content: string;
}

export class Midjourney {
    readonly auth: string;
    readonly application_id: string;
    readonly guild_id: string;
    readonly channel_id: string;
    readonly session_id: string;
    readonly cookie: string;
    //readonly x_super_properties: string;
    //readonly x_discord_locale: string;

    constructor(sample: string) {
        if (!sample.includes("{")) {
            // use sample as a filename
            sample = Deno.readTextFileSync(sample);
        }
        sample = sample.replace(/\\"/g, '"');
        this.auth = getExistinggroup(sample, /"authorization":\s?"([^"]+)"/);
        this.application_id = getExistinggroup(sample, /"application_id":\s?"(\d+)"/);
        this.guild_id = getExistinggroup(sample, /"guild_id":\s?"(\d+)"/);
        this.channel_id = getExistinggroup(sample, /"channel_id":\s?"(\d+)"/);
        this.session_id = getExistinggroup(sample, /"session_id":\s?"([^"]+)"/);
        this.cookie = getExistinggroup(sample, / "cookie":\s?"([^"]+)"/);
        // this.x_super_properties = getExistinggroup(sample, / "x-super-properties":\s?"([^"]+)"/);
        // this.x_discord_locale = getExistinggroup(sample, / "x-discord-locale":\s?"([^"]+)"/);
    }

    private buildPayload(cmd: Command): Payload {
        const payload: Payload = {
            type: 2,
            application_id: this.application_id,
            guild_id: this.guild_id,
            channel_id: this.channel_id,
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
        }
        return payload;
    }


    protected log(...args: unknown[]) {
        console.log(new Date().toISOString(), ...args)
    }

    async settings(): Promise<number> {
        const payload: Payload = this.buildPayload(cmd.settings);
        const response = await this.doInteractions(payload);
        if (response.status === 204) {
            // no content;
            return response.status;
        }
        console.log('status:', response.status);
        console.log('statusText:', response.statusText);
        const body = await response.json();
        console.log('statusText:', JSON.stringify(body, null, 2));
        return response.status;
    }

    async imagine(prompt: string): Promise<number> {
        const payload: Payload = this.buildPayload(cmd.imagine);
        payload.data.options = [{ type: 3, name: "prompt", value: prompt }];
        const response = await this.doInteractions(payload);
        if (response.status === 204) {
            // no content;
            return response.status;
        }
        console.log('status:', response.status, response.statusText);
        const body = await response.json();
        console.log('statusText:', JSON.stringify(body, null, 2));
        return response.status;
    }

    setSettingsRelax(): Promise<number> {
        // the messageId should be update
        return this.callCustom("1101102102157205574", "MJ::Settings::RelaxMode::on", MessageFlags.Ephemeral );
    }

    setSettingsFast(): Promise<number> {
        // the messageId should be update
        return this.callCustom("1101102102157205574", "MJ::Settings::RelaxMode::off", MessageFlags.Ephemeral );
    }

    callCustom2(button: ComponentsSummary): Promise<number> {
        return this.callCustom(button.parentId, button.custom_id);
    }

    async callCustom(messageId: Snowflake, custom_id: string, message_flags = 0): Promise<number> {
        if (!custom_id)
            throw Error("custom_id is empty")
        const payload: Payload = {
            type: ApplicationCommandType.Message, // 3
            application_id: this.application_id,
            guild_id: this.guild_id,
            channel_id: this.channel_id,
            session_id: this.session_id,
            message_flags,
            message_id: messageId,
            data: { component_type: 2, custom_id: custom_id },
        };
        const response = await this.doInteractions(payload);
        console.log(await response.text());
        return response.status;
    }

    async doInteractions(payload: Payload): Promise<Response> {
        const formData = new FormData();
        payload.nonce = new SnowflakeObj().encode();
        formData.append('payload_json', JSON.stringify(payload));
        const headers = {
            authorization: this.auth,
            cookie: this.cookie,
        };
        const response = await fetch(interactions, {
            method: "POST",
            body: formData,
            headers
        });
        return response;
    }

    async WaitMessage(prompt: string, opts: { maxWait?: number, loading?: (uri: string) => void } = {}): Promise<Message | null> {
        const { maxWait = 60, loading } = opts;

        for (let i = 0; i < maxWait; i++) {
            const msg = await this.FilterMessages(prompt, { limit: 10 }, { loading })
            if (msg !== null) {
                return msg;
            }
            await wait(1000 * 2)
        }
        return null;
    }

    async FilterMessages(prompt: string, filter: RESTGetAPIChannelMessagesQuery = {}, opts: { loading?: (uri: string) => void, options?: string } = {}): Promise<Message | null> {
        const { loading, options = '' } = opts;

        const data: DiscodMessage[] = await this.retrieveMessages(filter)
        for (let i = 0; i < data.length; i++) {
            const item = new DiscodMessageHelper(data[i]);
            if (!item.prompt)
                continue;
            const author = item.author.id;
            const itemPrompt = item.prompt.prompt;
            // console.log(item.prompt);
            if (author === this.application_id && (itemPrompt === prompt || itemPrompt.startsWith(`${prompt} -`))) {
                this.log('FilterMessages:', JSON.stringify(item))
                // if (options && !item.content.includes(options)) {
                //     this.log("no options")
                //     continue
                // }
                if (item.attachments.length === 0) {
                    this.log("no attachment")
                    break
                }
                const imageUrl = item.attachments[0].url
                if (!imageUrl.endsWith(".png")) {
                    this.log(imageUrl);
                    loading && loading(imageUrl)
                    break
                }

                // content: '**A little pink elephant** - <@1017020769332637730> (fast, stealth)'
                // const content = item.content.split('**')[1]

                const msg: Message = {
                    id: item.id,
                    uri: imageUrl,
                    hash: this.UriToHash(imageUrl),
                    content: item.prompt.prompt
                }
                return msg
            }
        }
        return null
    }

    protected UriToHash(uri: string) {
        return uri.split('_').pop()?.split('.')[0] ?? '';
    }

    async retrieveMessages(params: RESTGetAPIChannelMessagesQuery = {}): Promise<DiscodMessage[]> {
        const headers = {
            authorization: this.auth,
            cookie: this.cookie,
        };
        const url = new URL(`https://discord.com/api/v10/channels/${this.channel_id}/messages`);
        const searchParams = new URLSearchParams(url.search);// generic import prev params
        for (const [key, value] of Object.entries(params)) {
            searchParams.set(key, (value as Object).toString());
        }
        url.search = searchParams.toString();
        const response = await fetch(url.toString(), { headers });
        if (response.status === 200) {
            return response.json();
        }
        throw new Error(response.statusText + ' ' + await response.text());
    }

}

export default Midjourney;