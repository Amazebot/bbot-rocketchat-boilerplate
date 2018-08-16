const bot = require('bbot')
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// `text` branch types simply respond when regex pattern is met
// Test with "Hello bots!"
bot.global.text(/(hi|hello).*bots/, (b) => b.respond('Hello :wave:'))

// `direct` branch type requires the bot to be explicitly addressed
// `reply` instead of `respond` prepends messages with user's name
// Test with "@bRocket Hello."
bot.global.direct(/hi|hello/i, (b) => b.reply('Hey there.'))

// `respondVia` allows using custom platform methods to dispatch response
// Test with "Hello anyone?"
bot.global.text(/hi|hello/i, (b) => b.respondVia('react', ':wave:'))

// Branch callbacks allow asynchronous responding, if they return a promise
// State (b) includes branch matching attributes, see bbot.chat/docs/thought
// Test with "@bRocket ping back in 5 seconds"
bot.global.direct(/ping back in (\d*)/i, async (b) => {
  const ms = parseInt(b.match[1]) * 1000
  await delay(ms)
  return b.respond('Ping :ping_pong:')
})

bot.start() // 🚀
