const Disease = require("../models/disease");
const Plant = require("../models/plant");

// ======================================
// Show All Diseases
// ======================================
module.exports.index = async (req, res) => {

    const { search } = req.query;

    let allDiseases;

    if (search) {

        allDiseases = await Disease.find({
            diseaseName: {
                $regex: search,
                $options: "i",
            },
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
module.exports.renderNewForm = async (req, res) => {

    const plants = await Plant.find({});

    res.render("diseases/new", { plants });

};

// ======================================
// Show Disease
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

    const diseaseData = req.body.disease;

    // Symptoms
    diseaseData.symptoms = diseaseData.symptoms
        ? diseaseData.symptoms
              .split(",")
              .map(item => item.trim())
              .filter(item => item !== "")
        : [];

    // Causes
    diseaseData.causes = diseaseData.causes
        ? diseaseData.causes
              .split(",")
              .map(item => item.trim())
              .filter(item => item !== "")
        : [];

    // Prevention
    diseaseData.prevention = diseaseData.prevention
        ? diseaseData.prevention
              .split(",")
              .map(item => item.trim())
              .filter(item => item !== "")
        : [];

    // Recommended Plants
    if (!diseaseData.recommendedPlants) {

        diseaseData.recommendedPlants = [];

    } else if (!Array.isArray(diseaseData.recommendedPlants)) {

        diseaseData.recommendedPlants = [
            diseaseData.recommendedPlants,
        ];

    }

    const newDisease = new Disease(diseaseData);

    // Cloudinary Image
    if (req.file) {

        newDisease.image = {

            url: req.file.path,

            filename: req.file.filename,

        };

    }

    // Creator
    if (req.user) {
    newDisease.createdBy = req.user._id;
    };

    await newDisease.save();

    req.flash("success", "Disease Added Successfully!");

    res.redirect(`/diseases/${newDisease._id}`);

};

// ======================================
// Render Edit Form
// ======================================
module.exports.renderEditForm = async (req, res) => {

    const { id } = req.params;

    const disease = await Disease.findById(id);

    const plants = await Plant.find({});

    if (!disease) {

        req.flash("error", "Disease not found!");

        return res.redirect("/diseases");

    }

    res.render("diseases/edit", {

        disease,

        plants,

    });

};

// ======================================
// Update Disease
// ======================================
module.exports.updateDisease = async (req, res) => {

    const { id } = req.params;

    const diseaseData = req.body.disease;

    diseaseData.symptoms = diseaseData.symptoms
        ? diseaseData.symptoms
              .split(",")
              .map(item => item.trim())
              .filter(item => item !== "")
        : [];

    diseaseData.causes = diseaseData.causes
        ? diseaseData.causes
              .split(",")
              .map(item => item.trim())
              .filter(item => item !== "")
        : [];

    diseaseData.prevention = diseaseData.prevention
        ? diseaseData.prevention
              .split(",")
              .map(item => item.trim())
              .filter(item => item !== "")
        : [];

    if (!diseaseData.recommendedPlants) {

        diseaseData.recommendedPlants = [];

    } else if (!Array.isArray(diseaseData.recommendedPlants)) {

        diseaseData.recommendedPlants = [
            diseaseData.recommendedPlants,
        ];

    }

    const disease = await Disease.findByIdAndUpdate(

        id,

        diseaseData,

        {
            new: true,
            runValidators: true,
        }

    );

    // New Image
    if (req.file) {

        disease.image = {

            url: req.file.path,

            filename: req.file.filename,

        };

        await disease.save();

    }

    req.flash("success", "Disease Updated Successfully!");

    res.redirect(`/diseases/${disease._id}`);

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