const bot = require('bbot')

/** This is a workaround for Heroku to confirm web binding. */
// @todo Remove this when bBot includes Express (next release)
const http = require('http')
const handle = (req, res) => res.end('hit')
const server = http.createServer(handle)
server.listen(process.env.PORT || 5000)

/** Add your bot logic here. Removing the imported examples. */
require('./src/examples')

bot.start() // 🚀
