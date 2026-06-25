const Disease = require("../models/disease");

// ======================================
// Show All Diseases
// ======================================
module.exports.index = async (req, res) => {

    let { search } = req.query;

    let allDiseases;

    if (search) {
        allDiseases = await Disease.find({
            diseaseName: {
                $regex: search,
                $options: "i"
            }
        }).populate("recommendedPlants");
    } else {
        allDiseases = await Disease.find({})
            .populate("recommendedPlants");
    }

    res.render("diseases/index", { allDiseases });
};

// ======================================
// Render New Disease Form
// ======================================
module.exports.renderNewForm = (req, res) => {

    res.render("diseases/new");

};

// ======================================
// Show Single Disease
// ======================================
module.exports.showDisease = async (req, res) => {

    const { id } = req.params;

    const disease = await Disease.findById(id)
        .populate("recommendedPlants");

    if (!disease) {
        req.flash("error", "Disease not found!");
        return res.redirect("/diseases");
    }

    res.render("diseases/show", { disease });

};

// ======================================
// Create Disease
// ======================================
module.exports.createDisease = async (req, res) => {

    const newDisease = new Disease(req.body.disease);

    await newDisease.save();

    req.flash("success", "New Disease Added Successfully!");

    res.redirect("/diseases");

};

// ======================================
// Render Edit Form
// ======================================
module.exports.renderEditForm = async (req, res) => {

    const { id } = req.params;

    const disease = await Disease.findById(id);

    if (!disease) {
        req.flash("error", "Disease not found!");
        return res.redirect("/diseases");
    }

    res.render("diseases/edit", { disease });

};

// ======================================
// Update Disease
// ======================================
module.exports.updateDisease = async (req, res) => {

    const { id } = req.params;

    await Disease.findByIdAndUpdate(id, {
        ...req.body.disease
    });

    req.flash("success", "Disease Updated Successfully!");

    res.redirect(`/diseases/${id}`);

};

// ======================================
// Delete Disease
// ======================================
module.exports.destroyDisease = async (req, res) => {

    const { id } = req.params;

    await Disease.findByIdAndDelete(id);

    req.flash("success", "Disease Deleted Successfully!");

    res.redirect("/diseases");

};