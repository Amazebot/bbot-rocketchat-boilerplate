[create-user]: https://rocket.chat/docs/bots/creating-bot-users/
[configure-bot]: https://rocket.chat/docs/bots/configure-bot-environment/

![bRocket | A bBot boilerplate for Rocket.Chat bots](https://github.com/Amazebot/bbot-rocketchat-boilerplate/raw/master/img/banner.png)

## Setup

## 1. 🍴  Fork or clone this repo
  - `git clone amazebot/bbot-rocketchat-boilerplate MY_BOT`
  - to clone without git history, add `--depth 1` flag
  - or once cloned, start a fresh history `rm -rf .git && git init`
## 2. 💻  Setup your project
  - `npm install` get dependencies
  - `npm run setup` add your details
## 3. ✨  Test in shell
  - `npm start -- -m shell`
## 4. 👨‍💻  Start coding
  - customise **index.js**
  - look at **examples.js**
## 5. 💬  Run in Rocket.Chat
  - create user with bot role
  - set login credentials in .env
  - `npm start` (`rocketchat` is default adapter)

___

You'll need a Rocket.Chat instance to test. See Rocket.Chat's docs on
[Creating Bot Users][create-user] before you begin.

Easy deployment options coming soon.

See [bbot.chat](http://bbot.chat) for get started guides.

## Configure

All **bBot** settings require the `BOT_` prefix on environment variables.

See Rocket.Chat's docs on [Configuring Bot Environments][configure-bot] for 
settings specific to the SDK.

Configs can be given from command line. Try `node index.js -h` for options.

They can also be set in **package.json** under the `"bot"` attribute. You should
review all the package details and customise it to your own project details.

## Development

You can run and interact with the bot directly in shell, for quick development.

Run `node index.js -m shell` to override Rocket.Chat as the message adapter.