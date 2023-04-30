# midjourney-discord-api

`midjourney-discord-api` is a library designed to connect to a Discord channel
and send messages to be processed by the Midjourney bot. It utilizes the same
requests as the Discord web client, allowing seamless communication with the
bot. To configure the library, extract an authenticated request sent to the
Midjourney bot using your web development tools.

## Features

| feature     | Status             | feature      | Status        |
| ----------- | ------------------ | ------------ | ------------- |
| `/ask`      | :see_no_evil:      | `/private`   | :x: N/A       |
| `/blend`    | :writing_hand: WIP | `/public`    | :x: N/A       |
| `/describe` | ✅                 | `/relax`     | ✅            |
| `/fast`     | ✅                 | `/settings`  | ✅            |
| `/help`     | :see_no_evil:      | `/show`      | :x: N/A       |
| `/imagine`  | ✅                 | `/stealth`   | :x: N/A       |
| `/info`     | :x: N/A            | `/subscribe` | :see_no_evil: |
| `/invite`   | :see_no_evil:      | `/prefer`    | :x: N/A       |
| `Upscale`   | ✅                 | `Variations` | ✅            |
| `Reroll`    | ✅                 |              |               |

## Installation

### NodeJS ESM or CJS

```sh
npm install midjourney-discord-api
```

### ESM nodeJS

```js
import Midjourney from "midjourney-discord-api";

const cli = new Midjourney("interaction.txt");
const msgs = await cli.getMessages();
console.log(msgs.length + " messages visibles"); // by default get 50 messages
```

### Deno

```ts
import Midjourney from "https://deno.land/x/midjourney_discord_api/mod.ts";
```

## Token / ids extraction.

- Open your webbrowser
- Go to your discord channel
- Open the developent bar
- Go to network
- Send a request to discordBot, like /settings
- Left click on the `https://discord.com/api/v9/interactions` request.
- Click `Copy`
- Click `Copy as fetch`
- Save this request in a file, that you will provide to the `Midjourney`
  constructor. (for my Test I name this file `interaction.txt`)

## Usage

Here are some examples of how to use the `Midjourney` class:

### Describe URL

```ts
import Midjourney from "midjourney-discord-api";

const client = new Midjourney("interaction.txt");
const prompts: string[] = await client.describeUrl(
  "https://cdn.midjourney.com/95e2c8fd-255c-4982-9065-83051143570c/0_0_640_N.webp",
);
console.log("reversed prompt: ", prompts);
```

### Imagine

```ts
import Midjourney from "midjourney-discord-api";

const client = new Midjourney("interaction.txt");
const msg = await client.imagine(
  "A photo of an astronaut riding a horse",
);
console.log("you find your result here: ", msg.attachments[0].url);
```

### Upscale

```ts
import Midjourney from "midjourney-discord-api";

const client = new Midjourney("interaction.txt");
const msg = await client.imagine(
  "A photo of an astronaut riding a horse",
);
if (msg.canUpscale()) {
  const result = msg.upscale(2);
  console.log(`upscale U2 Ready from`, result.attachments[0].url);
}
```

### Variant

```ts
import Midjourney from "midjourney-discord-api";

const client = new Midjourney("interaction.txt");
const msg = await client.imagine(
  "A photo of an astronaut riding a horse",
);
if (msg.canVariant()) {
  const result = msg.variant(2);
  console.log(`upscale V2 Ready from`, result.attachments[0].url);
}
```

### Reroll

```ts
import Midjourney from "midjourney-discord-api";

const client = new Midjourney("interaction.txt");
const msg = await client.imagine(
  "A photo of an astronaut riding a horse",
);
if (msg.canReroll()) {
  const result = msg.reroll();
  console.log(`upscale V2 Ready from`, result.attachments[0].url);
}
```

## API Documentation

Refer to the provided method signatures and samples in the original post for
detailed information on how to use each method and interface.

## Contributing

We welcome contributions to the midjourney-discord-api project. Please feel free
to submit issues, feature requests, and pull requests to improve the project.

## reference

- [Discord Snowflake to Timestamp Converter](https://snowsta.mp/)

## License

This project is licensed under the MIT License.
