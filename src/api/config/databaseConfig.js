/* DATABASE */
const { MongoClient } = require("mongodb");
const { connected } = require("process");
const connectionString = process.env.ATLAS_URI;

let dbConnection;

//Create a connection to the database
const connectToServer = async () => {
    const client = new MongoClient(connectionString);

    try {
        await client.connect();
        dbConnection = client.db('LoanStreet');
        console.log('Successfully connected to database...');
    } catch (e) {
        console.error(e);
    }
}

//get a copy of the connection
const getDb = () => dbConnection;

module.exports = {connectToServer, getDb}