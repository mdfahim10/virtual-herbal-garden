const Plant = require("../models/plant");

// ======================================
// Helper Function
// ======================================

function stringToArray(value) {

    if (!value) return [];

    if (Array.isArray(value)) return value;

    return value
        .split(",")
        .map(item => item.trim())
        .filter(item => item !== "");

}

// ===============================
// Show All Plants
// ===============================
module.exports.index = async (req, res) => {

    let { search, plantType } = req.query;

    let allPlants;

    if (search) {

        allPlants = await Plant.find({
            $or: [
                {
                    commonName: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    scientificName: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    localName: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ],
        });

    } else if (plantType) {

        allPlants = await Plant.find({ plantType });

    } else {

        allPlants = await Plant.find({});

    }

    res.render("plants/index", { allPlants });

};

// ===============================
// Render New Plant Form
// ===============================
module.exports.renderNewForm = (req, res) => {

    res.render("plants/new");

};

// ===============================
// Show Single Plant
// ===============================
module.exports.showPlant = async (req, res) => {

    const { id } = req.params;

    const plant = await Plant.findById(id);

    if (!plant) {

        req.flash("error", "Plant does not exist!");

        return res.redirect("/plants");

    }

    res.render("plants/show", { plant });

};

// ===============================
// Create Plant
// ===============================
module.exports.createPlant = async (req, res) => {

    const plantData = req.body.plant;

    const newPlant = new Plant({

        commonName: plantData.commonName,

        scientificName: plantData.scientificName,

        localName: plantData.localName,

        ayushSystem: plantData.ayushSystem,

        plantType: plantData.plantType,

        partsUsed: stringToArray(plantData.partsUsed),

        medicinalUses: {

            primaryUses: stringToArray(plantData.primaryUses),

            conditionsTreated: stringToArray(plantData.conditionsTreated),

        },

        howToUse: {

            method: plantData.method,

            steps: stringToArray(plantData.steps),

        },

        precautions: stringToArray(plantData.precautions),

        possibleSideEffects: {

            mild: stringToArray(plantData.mild),

            overuse: stringToArray(plantData.overuse),

            allergicReactions: stringToArray(plantData.allergic),

        }

    });

    if (req.file) {

        newPlant.image = {

            url: req.file.path,

            filename: req.file.filename

        };

    }

    if (req.user) {

        newPlant.createdBy = req.user._id;

    }

    await newPlant.save();

    req.flash("success", "New Plant Added Successfully!");

    res.redirect(`/plants/${newPlant._id}`);

};
// ===============================
// Render Edit Form
// ===============================
module.exports.renderEditForm = async (req, res) => {

    const { id } = req.params;

    const plant = await Plant.findById(id);

    if (!plant) {

        req.flash("error", "Plant does not exist!");

        return res.redirect("/plants");

    }

    res.render("plants/edit", { plant });

};
// ===============================
// Update Plant
// ===============================
module.exports.updatePlant = async (req, res) => {

    const { id } = req.params;

    const plantData = req.body.plant;

    const plant = await Plant.findById(id);

    if (!plant) {

        req.flash("error", "Plant not found!");

        return res.redirect("/plants");

    }

    plant.commonName = plantData.commonName;

    plant.scientificName = plantData.scientificName;

    plant.localName = plantData.localName;

    plant.ayushSystem = plantData.ayushSystem;

    plant.plantType = plantData.plantType;

    plant.partsUsed = stringToArray(plantData.partsUsed);

    plant.medicinalUses = {

        primaryUses: stringToArray(plantData.primaryUses),

        conditionsTreated: stringToArray(plantData.conditionsTreated),

    };

    plant.howToUse = {

        method: plantData.method,

        steps: stringToArray(plantData.steps),

    };

    plant.precautions = stringToArray(plantData.precautions);

    plant.possibleSideEffects = {

        mild: stringToArray(plantData.mild),

        overuse: stringToArray(plantData.overuse),

        allergicReactions: stringToArray(plantData.allergic),

    };

    if (req.file) {

        plant.image = {

            url: req.file.path,

            filename: req.file.filename

        };

    }

    await plant.save();

    req.flash("success", "Plant Updated Successfully!");

    res.redirect(`/plants/${plant._id}`);

};
// ===============================
// Delete Plant
// ===============================
module.exports.destroyPlant = async (req, res) => {

    const { id } = req.params;

    await Plant.findByIdAndDelete(id);

    req.flash("success", "Plant Deleted Successfully!");

    res.redirect("/plants");

};