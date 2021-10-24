const log4js = require('log4js')
require('dotenv').config()

log4js.configure({
    appenders: {
        everything: { type: 'dateFile', filename: 'log/logger.log' },
        out: { type: 'stdout' },
        app: { type: 'file', filename: 'log/logger.log' }
    },
    categories: {
        default: { appenders: [ 'everything','out'], level: process.env.DEBUG_LEVEL }
    }
});

module.exports = log4js