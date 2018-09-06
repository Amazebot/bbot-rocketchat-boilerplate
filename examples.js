const bot = require('bbot')

/**
 * All branch examples start from the "global" conversation scope.
 * We are working on features to provide branching within a conversational
 * context, but as those methods are changing in the beta, they aren't included
 * as examples to follow just yet.
 */

/**
 * Branch types are declared from their scope, see all available types here:
 * http://bbot.chat/docs/path#builtforbranching
 *
 * `text` branches take the following arguments:
 *  - matcher: expression, semantic conditions object, or array of conditions
 *  - callback: to fire on successful match, given the state object (b)
 *  - [options]:  object with `id` (string) and/or `force` (boolean) attributes
 *
 * Test with "Hello bots!"
*/
bot.global.text(/(hi|hello).*bots/, (b) => b.respond('Hello :wave:'), {
  id: 'hello-bots'
})

/**
 * `direct` branch type requires the bot to be explicitly addressed.
 *
 * `reply` instead of `respond` prepends messages with user's name.
 *
 * In Rocket.Chat all messages to a bot in a direct room have the name prepended
 * by the Rocket.Chat SDK before it's processed by the bot framework.
 *
 * Test with "@bRocket Hello" or just "Hello" in a DM.
*/
bot.global.direct(/hi|hello/i, (b) => b.reply('Hey there.'), {
  id: 'hello-direct'
})

/**
 * `respondVia` allows using custom platform methods to dispatch response.
 *
 * Matcher conditions allow semantic attributes with a string or array of
 * optional values to match against, possibly capturing content.
 * Accepted atts: is, starts, ends, contains, excludes, after, before, range
 *
 * Test with "Hello anyone?"
*/
bot.global.text({
  contains: ['hi', 'hello']
}, (b) => b.respondVia('react', ':wave:'), {
  id: 'hello-react'
})

/**
 * Branch callbacks allow asynchronous responding, if they return a promise.
 * State (b) includes branch matching attributes, see bbot.chat/docs/thought.
 *
 * Test with "@bRocket ping back in 5 seconds"
*/
bot.global.direct(/ping back in (\d*)/i, async (b) => {
  const ms = parseInt(b.match[1]) * 1000
  await new Promise((resolve) => setTimeout(resolve, ms))
  return b.respond('Ping :ping_pong:')
}, {
  id: 'ping-delay'
})

/**
 * The `respond` method can accept attachment objects as well as strings.
 * Rendering support depends on the message platform and adapter. In shell,
 * it will display the fallback text.
 *
 * Test with "bot attach image"
 */
bot.global.text(/attach image/i, (b) => {
  return b.respond({
    fallback: `See: https://www.wikiwand.com/en/Three_Laws_of_Robotics`,
    image: `https://upload.wikimedia.org/wikipedia/en/8/8e/I_Robot_-_Runaround.jpg`,
    title: {
      text: `Asimov's Three Laws of Robotics`,
      link: `https://www.wikiwand.com/en/Three_Laws_of_Robotics`
    }
  })
}, { id: 'attach-image' })

/**
 * The `envelope` provides helpers for adding rich-message payloads before
 * responding. Preparing envelopes before dispatch also allows changing the
 * user/room the envelope is addressed to or dispatching multiple envelopes.
 *
 * Test with "I want a prize"
 */
bot.global.text({
  contains: 'prize'
}, (b) => {
  b.envelope.write('Choose your fate! 🚪... 🎁 ')
  b.envelope.attach({ color: '#f4426e' })
  b.envelope.payload
    .quickReply({ text: 'Door number 1' })
    .quickReply({ text: 'Door number 2' })
    .quickReply({ text: 'Door number 3' })
  return b.respond()
}, { id: 'door-prize-intro' })

/**
 * The `conditions` attribute contains results of semantic condition matching
 * and capture groups. Each condition can be given a key for easy reference.
 *
 * Test with "what's behind door number 2"
 */
bot.global.text({
  door: { after: 'door', range: '1-3' }
}, (b) => {
  switch (b.conditions.captured.door) {
    case '1': return b.respond(`You win nothing 💔`)
    case '2': return b.respond(`You win a monkey 🐒`)
    case '3': return b.respond(`It's a new car!! 🚗`)
  }
}, { id: 'door-prize-award' })

/**
 * User details contain the source of the current message within Rocket.Chat.
*/
bot.global.text(/where am i/i, (b) => {
  const { name, type } = b.message.user.room
  switch (type) {
    case 'c': return b.respond(`You're in the #${name} public channel.`)
    case 'p': return b.respond(`You're in a private group called **${name}**.`)
    case 'l': return b.respond(`You're in a livechat channel.`)
    case 'd': return b.respond(`You're in a DM with me :hugging:`)
  }
}, {
  id: 'location-check'
})

/**
 * Custom options can be added to the bot, with the full config utility of bBot,
 * allowing them to be defined as environment variables, command line args or
 * package.json attributes. Extend settings with a yargs option format.
 *
 * Try any of the following:
 *  - `node index.js --avatar <YOUR_AVATAR_URL>`
 *  - BOT_AVATAR=<YOUR_AVATAR_URL> in .env
 *  - `{ "bot": { "avatar": "<YOUR_AVATAR_URL>" } }` in package.json
 */
bot.settings.extend({
  avatar: {
    'type': 'string',
    'description': 'Set a custom avatar for your bot account profile'
  }
})

/**
 * The bot can access lower level methods of the Rocket.Chat SDK through the
 * message adapter, once it's connected.
 */
bot.events.on('started', () => {
  if (bot.adapters.message.name !== 'rocketchat-message-adapter') return
  if (bot.settings.get('avatar')) {
    bot.logger.info('Setting bot avatar')
    bot.adapters.message.api.post('users.setAvatar', {
      avatarUrl: bot.settings.get('avatar')
    })
  }
})

bot.start() // 🚀
