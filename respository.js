const logger = require('./logger').getLogger('repository.js')
const database = require('./mongo-connect')

async function isSavedByUserName(username) {
    logger.debug('isSavedByUserName()', username)
    return await findUserByUsername(username) ? true : false;
}

async function isSavedByPhone(phone) {
    logger.debug('isSavedByUserName()', username)
    return await findUserByphone(phone) ? true : false;
}

async function save(chat_id, username, phoneNumber) {
    let db = await database.get();
    const userCollection = db.collection("bot_users");
    let userSaved = await findUserByUsername(username)
    if (userSaved) {
        userSaved.phone = phoneNumber;
        var newvalues = { $set: {phone: phoneNumber} }
        userCollection.updateOne({username: username}, newvalues)
        logger.debug('user saved', username)
    } else {
        const user = {
            id: chat_id,
            username: username,
            phone: phoneNumber
        }
        userCollection.insertOne(user);
        logger.debug('new user saved', username)
    }
}

async function findUserByUsername(username) {
    logger.debug('findUserByUsername()', username)
    let db = await database.get();
    const userCollection = db.collection("bot_users");
    let user = await userCollection.findOne({username: username})
    return user;
}

async function findUserByphone(phone) {
    logger.debug('findUserByphone()', phone)
    let db = await database.get();
    const userCollection = db.collection("bot_users");
    let user = await userCollection.findOne({phone: phone})
    return user;
}

module.exports = {isSavedByPhone, isSavedByUserName, findUserByUsername, findUserByphone, save}