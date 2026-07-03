const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");

const diseaseController = require("../controllers/disease");

const {
    isLoggedIn,
    validateDisease,
} = require("../middleware");

// Cloudinary
const multer = require("multer");
const { storage } = require("../cloudConfig");

const upload = multer({ storage });


// ======================================
// Show All Diseases & Create Disease
// ======================================

router
.route("/")
.get(wrapAsync(diseaseController.index))
.post(
    isLoggedIn,
    upload.single("diseaseImage"),
    validateDisease,
    wrapAsync(diseaseController.createDisease)
);


// ======================================
// Render New Disease Form
// ======================================

router.get(
    "/new",
    isLoggedIn,
    diseaseController.renderNewForm
);


// ======================================
// Show Disease
// ======================================

router.get(
    "/:id",
    wrapAsync(diseaseController.showDisease)
);


// ======================================
// Render Edit Form
// ======================================

router.get(
    "/:id/edit",
    isLoggedIn,
    wrapAsync(diseaseController.renderEditForm)
);


// ======================================
// Update Disease
// ======================================

router.put(
    "/:id",
    isLoggedIn,
    upload.single("diseaseImage"),
    validateDisease,
    wrapAsync(diseaseController.updateDisease)
);


// ======================================
// Delete Disease
// ======================================

router.delete(
    "/:id",
    isLoggedIn,
    wrapAsync(diseaseController.destroyDisease)
);

module.exports = router;