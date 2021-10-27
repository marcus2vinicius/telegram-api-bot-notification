const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const connectionString = process.env.MONGO_CONNECTION_STRING;
const logger = require('./logger').getLogger('mongo-client.js')

const connection = function (){
    var db = null;

    async function connect() {
        try {
            let client = await MongoClient.connect(connectionString);
            _db = client.db("ligabrasil");
            logger.info("mongo database connected")
            return _db
        } catch (e) {
            return e;
        }
    }

    async function get() {
        try {

            if (db != null) {
                return db;
            } else {
                db = await connect();
                return db;
            }
        } catch (e) {
            return e;
        }
    }

    return {
        get: get
    }
}

connection().get();

module.exports = connection()
