const express = require('express'),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 3001;
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const logger = require('./logger').getLogger('server.js')

app.listen(port, function() {
    logger.info('listening on ', port)
})

module.exports = { app };