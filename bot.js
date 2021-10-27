const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const repository = require('./respository')
const logger = require('./logger').getLogger('bot.js')
const phoneNumber = require('validate-phone-number-node-js');

const TOKEN_BOT = process.env.TOKEN_BOT
const bot = new TelegramBot(TOKEN_BOT, {polling: true})
const BOT_ENABLED = process.env.BOT_ENABLED === 'true'

const PARSE_MODE = {
    HTML: 'HTML',
    MARKDOWN: 'Markdown'
}

/**
 * send msg directly to chat with user or group/chanel
 * @param tokenBot
 * @param chatId
 * @param msg
 * @param parse_mode
 */
function sendMsgToBot(tokenBot, chatId, msg, parse_mode){
    logger.debug("token:{}, chatId:{}", tokenBot, chatId)
    bot.sendMessage(chatId, msg, {parse_mode: parse_mode})
}

/**
 * send message to user searching username in database
 * @param tokenBot
 * @param username
 * @param msg
 * @param parse_mode
 * @returns {Promise<TelegramBot.Promise|string>}
 */
async function sendMsgToUserName(tokenBot, username, msg, parse_mode){
    logger.debug("token:{}, chatId:{}", tokenBot, username)
    let user = await repository.findUserByUsername(username)
    if(user)
        return bot.sendMessage(user.id, msg, {parse_mode: parse_mode})
    else{
        logger.error('user not found by username ', username)
        return Promise.resolve('The user needs to send a message to bot on the telegram and register his phone number');
    }
}

/**
 * send message to user searching phone in database
 * @param tokenBot
 * @param phone
 * @param msg
 * @param parse_mode
 * @returns {Promise<TelegramBot.Promise|string>}
 */
async function sendMsgToPhone(tokenBot, phone, msg, parse_mode){
    logger.debug("token:{}, chatId:{}", tokenBot, phone)
    let user = await repository.findUserByphone(phone)
    if(user)
        return bot.sendMessage(user.id, msg, {parse_mode: parse_mode})
    else{
        logger.error('user not found by phonenumber', phone)
        return Promise.resolve('The user needs to send a message to bot on the telegram and register his phone number');
    }
}

/*
function sendPicToBot(stream, chatId){
    logger.debug("pic sent")
    if(BOT_ENABLED)
        if(chatId)
            bot.sendPhoto(chatId, stream)
        else
            bot.sendPhoto(TELEGRAM_GROUP_ID, stream)
}*/

bot.onText(/\/start/, (msg) => {
    if(msg.chat.type == 'private'){
        bot.sendMessage(msg.chat.id, process.env.BOT_MSG_START)
    }
});

function showProfileToUser(user) {
   let msg = `${process.env.BOT_MSG_CONFIGURED_NUMBER} ${user.phone}
   \n${process.env.BOT_MSG_COMMAND_CHANGE_NUMBER}`;
    bot.sendMessage(user.id,msg)
}

bot.onText(/\/profile/, async (msg) => {
    if (await repository.isSavedByUserName(msg.chat.username) && msg.chat.type == 'private') {
        let user = await repository.findUserByUsername(msg.chat.username);
        showProfileToUser(user);
    } else {
        bot.sendMessage(msg.chat.id, 'you are not configured try send /start')
    }
});

bot.onText(  /^\d+$/, (msg) => {

    if(msg.chat.type=='private') {
        const numberValid = phoneNumber.validate('+55' + msg.text);
        if (!numberValid) {
            logger.debug('invalid number')
            bot.sendMessage(msg.chat.id, process.env.BOT_MSG_WRONG_NUMBER)
            bot.sendMessage(msg.chat.id, process.env.BOT_MSG_START)
        } else {
            logger.debug('number is valid and trying to save')
            repository.save(msg.chat.id, msg.chat.username, msg.text)
            bot.sendMessage(msg.chat.id, process.env.BOT_MSG_NUMBER_SAVED)
        }
    }

});

module.exports = { sendMsgToBot, PARSE_MODE, sendMsgToUserName, sendMsgToPhone};