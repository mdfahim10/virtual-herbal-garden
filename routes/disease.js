const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const diseaseController = require("../controllers/disease");

// ======================================
// Show All Diseases & Create Disease
// ======================================

router
    .route("/")
    .get(wrapAsync(diseaseController.index))
    .post(wrapAsync(diseaseController.createDisease));

// ======================================
// Render New Disease Form
// ======================================

router.get(
    "/new",
    diseaseController.renderNewForm
);

// ======================================
// Show, Update & Delete Disease
// ======================================

router
    .route("/:id")
    .get(wrapAsync(diseaseController.showDisease))
    .put(wrapAsync(diseaseController.updateDisease))
    .delete(wrapAsync(diseaseController.destroyDisease));

// ======================================
// Render Edit Disease Form
// ======================================

router.get(
    "/:id/edit",
    wrapAsync(diseaseController.renderEditForm)
);

module.exports = router;