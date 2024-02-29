// Reusable Mongodb client
require("dotenv").config();

const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");

// Database name
const DBNAME = "TeriyakiAnime";

module.exports = { DBNAME, MONGO_URI, MongoClient };