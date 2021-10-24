const server = require("./server")
const logger = require('./logger').getLogger('index.js')
require('dotenv').config()
const api = require("./api")

logger.info("bot enabled: ", process.env.BOT_ENABLED)
logger.info("debug level: ", process.env.DEBUG_LEVEL)
logger.info('all modules loaded')




