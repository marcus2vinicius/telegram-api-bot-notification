const users = [];
const logger = require('./logger').getLogger('repository.js')

function isSavedByUserName(username){
    logger.debug('isSavedByUserName()', username)
    return findUserByUsername(username) ? true : false;
}

function isSavedByPhone(phone){
    logger.debug('isSavedByUserName()', username)
    return findUserByphone(phone) ? true : false;
}

function save(chat_id, username, phoneNumber){
    let userSaved = findUserByUsername(username)
    if(userSaved){
        userSaved.phone = phoneNumber;
    }else{
        const user = {
            id: chat_id,
            username: username,
            phone: phoneNumber
        }
        users.push(user)
    }
    logger.debug('new user saved', username)
}

function findUserByUsername (username){
    logger.debug('findUserByUsername()', username)
    return users.find(u=>u.username == username);
}

function findUserByphone (phone){
    logger.debug('findUserByphone()', phone)
    return users.find(u=>u.phone == phone);
}

module.exports = {isSavedByPhone, isSavedByUserName, findUserByUsername, findUserByphone, save}