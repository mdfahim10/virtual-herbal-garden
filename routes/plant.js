const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const plantController = require("../controllers/plant");

const {
    isLoggedIn,
    validatePlant,
} = require("../middleware");

const multer = require("multer");
const { storage } = require("../cloudConfig");

const upload = multer({ storage });


// ======================================
// Show All Plants & Create Plant
// ======================================

router
.route("/")
.get(wrapAsync(plantController.index))
.post(
    isLoggedIn,
    upload.single("plantImage"),
    validatePlant,
    wrapAsync(plantController.createPlant)
);


// ======================================
// Render New Plant Form
// ======================================

router.get(
    "/new",
    isLoggedIn,
    plantController.renderNewForm
);


// ======================================
// Show Single Plant
// ======================================

router.get(
    "/:id",
    wrapAsync(plantController.showPlant)
);


// ======================================
// Render Edit Form
// ======================================

router.get(
    "/:id/edit",
    isLoggedIn,
    wrapAsync(plantController.renderEditForm)
);


// ======================================
// Update Plant
// ======================================

router.put(
    "/:id",
    isLoggedIn,
    upload.single("plantImage"),
    validatePlant,
    wrapAsync(plantController.updatePlant)
);


// ======================================
// Delete Plant
// ======================================

router.delete(
    "/:id",
    isLoggedIn,
    wrapAsync(plantController.destroyPlant)
);


module.exports = router;