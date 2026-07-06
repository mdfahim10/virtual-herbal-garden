const mongoose = require("mongoose");
const Plant = require("../models/plant");
const plants = require("../data/plants.json");
require("dotenv").config();
const MONGO_URL =
    process.env.ATLASDB_URL ||
    "mongodb://127.0.0.1:27017/virtualHerbalGarden";
// Connect Database
async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Database Connected");
}
main()
    .then(initDB)
    .catch(err => console.log(err));
// Seed Plant
async function initDB() {
    try {
        await Plant.deleteMany({});
        console.log("🗑 Old Plants Deleted");
        await Plant.insertMany(plants);
        console.log(`🌿 ${plants.length} Plants Added Successfully!`);
    }
    catch (err) {
        console.log(err);
    }
    finally {
        await mongoose.connection.close();
        console.log("🔒 Database Connection Closed");
    }
}