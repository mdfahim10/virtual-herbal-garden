const Plant = require("../models/plant");

// ===============================
// Show All Plants
// ===============================
module.exports.index = async (req, res) => {
    let { search, plantType } = req.query;
    let allPlants;

    if (search) {
        allPlants = await Plant.find({
            $or: [
                { commonName: { $regex: search, $options: "i" } },
                { scientificName: { $regex: search, $options: "i" } },
                { localName: { $regex: search, $options: "i" } }
            ]
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

    const newPlant = new Plant(req.body.plant);

    await newPlant.save();

    req.flash("success", "New Plant Added Successfully!");

    res.redirect("/plants");
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

    await Plant.findByIdAndUpdate(id, {
        ...req.body.plant
    });

    req.flash("success", "Plant Updated Successfully!");

    res.redirect(`/plants/${id}`);
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