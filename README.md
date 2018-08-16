[create-user]: https://rocket.chat/docs/bots/creating-bot-users/
[configure-bot]: https://rocket.chat/docs/bots/configure-bot-environment/

**bRocket**

bRocket is a bBot boilerplate for building Rocket.Chat bots.

You'll need a Rocket.Chat instance to test, then clone this repository, install
npm dependencies and review package and environment config details below.

See Rocket.Chat's docs on [Creating Bot Users][create-user] before you begin.

Start the bot with `npm run start`, `yarn start` or `node index.js`

## Configure

Create a local .env file. All bBot settings require the `BOT_` prefix on
environment variables. Try the following defaults...

```sh
ROCKETCHAT_USER="brocket"
ROCKETCHAT_PASSWORD="password"
RESPOND_TO_DM=true
RESPOND_TO_EDITED=true
BOT_LOG_LEVEL="debug"
BOT_SHELL_USER_NAME="user"
BOT_SHELL_ROOM="room"
```

Configs can be given from command line. Try `node index.js -h` for options.

Configs can be set in **package.json** under the `"bot"` attribute. You should
review all the package details and customise it to your own project details.

The name in the package can be used to address the bot, just as it's username.
It will also respond to it's alias (default is **brock**).

See Rocket.Chat's docs on [Configuring Bot Environments][configure-bot] for more.

## Development

You can run and interact with the bot directly in shell, for quick development.

Run `node index.js -m shell` to override Rocket.Chat as the message adapter.