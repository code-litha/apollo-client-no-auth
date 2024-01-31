const { MongoClient, ObjectId } = require("mongodb");
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

const dbName = process.env.MONGO_DB_NAME;
let db;

async function mongoConnect() {
  try {
    await client.connect();
    console.log("Connected successfully to mongodb");

    db = client.db(dbName);
    return db;
  } catch (error) {
    await client.close();
  }
}

function getDatabase() {
  return db;
}

module.exports = {
  mongoConnect,
  getDatabase,
  client,
};
