const mongoose = require("mongoose");
const Disease = require("../models/disease");
const diseases = require("../data/diseases.json");
require("dotenv").config();

const MONGO_URL =
    process.env.ATLASDB_URL ||
    "mongodb://127.0.0.1:27017/virtualHerbalGarden";

// ===============================
// Connect Database
// ===============================

async function main() {

    await mongoose.connect(MONGO_URL);

    console.log("✅ Database Connected");

}

main()
    .then(initDB)
    .catch(err => console.log(err));

// ===============================
// Seed Diseases
// ===============================

async function initDB() {

    try {

        await Disease.deleteMany({});

        console.log("🗑 Old Diseases Deleted");

        await Disease.insertMany(diseases);

        console.log(`🩺 ${diseases.length} Diseases Added Successfully!`);

    }

    catch (err) {

        console.log(err);

    }

    finally {

        await mongoose.connection.close();

        console.log("🔒 Database Connection Closed");

    }

}