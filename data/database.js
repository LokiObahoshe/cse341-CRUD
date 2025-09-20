const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let petsDb;
let ownersDb;

const initDb = async (callback) => {
    if (petsDb && ownersDb) {
        console.log('Databases are already initialized!');
        return callback(null, { petsDb, ownersDb });
    }

    try {
        // Connect to pets DB
        const petsClient = await MongoClient.connect(process.env.MONGODB_URL_PETS);
        petsDb = petsClient.db(); // will default to "pets" from URL

        // Connect to owners DB
        const ownersClient = await MongoClient.connect(process.env.MONGODB_URL_OWNERS);
        ownersDb = ownersClient.db(); // will default to "owners" from URL

        console.log('Both databases connected successfully.');
        callback(null, { petsDb, ownersDb });
    } catch (err) {
        callback(err);
    }
};

const getPetsDb = () => {
    if (!petsDb) {
        throw Error('Pets database not initialized');
    }
    return petsDb;
};

const getOwnersDb = () => {
    if (!ownersDb) {
        throw Error('Owners database not initialized');
    }
    return ownersDb;
};

module.exports = {
    initDb,
    getPetsDb,
    getOwnersDb
};