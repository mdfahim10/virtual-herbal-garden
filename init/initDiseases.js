const mongoose = require("mongoose");

const Disease = require("../models/disease");
const Plant = require("../models/plant");

const diseases = require("../data/diseases.json");

require("dotenv").config();

const MONGO_URL =
    process.env.ATLASDB_URL ||
    "mongodb://127.0.0.1:27017/virtualHerbalGarden";

// ======================================
// Connect Database
// ======================================

async function main() {

    await mongoose.connect(MONGO_URL);

    console.log("✅ Database Connected");

}

main()
    .then(initDB)
    .catch(err => console.log(err));

// ======================================
// Seed Diseases
// ======================================

async function initDB() {

    try {

        await Disease.deleteMany({});

        console.log("🗑 Old Diseases Deleted");

        // ----------------------------------
        // Convert Plant Names → ObjectIds
        // ----------------------------------

        const updatedDiseases = [];

        for (let disease of diseases) {

            const plantIds = [];

            for (let plantName of disease.recommendedPlants) {

                const plant = await Plant.findOne({
                    commonName: plantName
                });

                if (plant) {

                    plantIds.push(plant._id);

                } else {

                    console.log(`⚠ Plant not found: ${plantName}`);

                }

            }

            disease.recommendedPlants = plantIds;

            updatedDiseases.push(disease);

        }

        await Disease.insertMany(updatedDiseases);

        console.log(
            `🩺 ${updatedDiseases.length} Diseases Added Successfully!`
        );

    }

    catch (err) {

        console.log(err);

    }

    finally {

        await mongoose.connection.close();

        console.log("🔒 Database Connection Closed");

    }

}