const server = require("./server");
const logger = require('./logger').getLogger('api.js')
const bot = require("./bot")


server.app.post('/send', (req, res) => {
    logger.debug('msg sent to group')
    bot.sendMsgToBot(req.body.tokenBot,
        req.body.groupId,
        req.body.message,
        bot.PARSE_MODE.MARKDOWN)
    res.send({ status: 'sent' });
})

server.app.post('/send-to-username', async (req, res) => {
    logger.debug('send to user by username')
    let response = await bot.sendMsgToUserName(req.body.tokenBot,
        req.body.username,
        req.body.message,
        bot.PARSE_MODE.MARKDOWN)
    if(response && response.message_id)
        res.send({status: 'sent'});
    else res.status(404).send({status:'not sent'})
})

server.app.post('/send-to-phonenumber', async (req, res) => {
    logger.debug('send to user by phonenumber')
    let response = await bot.sendMsgToPhone(req.body.tokenBot,
        req.body.phone,
        req.body.message,
        bot.PARSE_MODE.MARKDOWN)
    if(response && response.message_id)
        res.send({status: 'sent'});
    else res.status(404).send({status:'not sent', message: response})
})