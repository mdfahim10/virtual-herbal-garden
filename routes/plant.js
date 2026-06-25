const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");

const plantController = require("../controllers/plant");

// ===============================
// Show All Plants & Create Plant
// ===============================

router
.route("/")
.get(wrapAsync(plantController.index))
.post(wrapAsync(plantController.createPlant));

// ===============================
// Render New Plant Form
// ===============================

router.get(
    "/new",
    plantController.renderNewForm
);

// ===============================
// Show, Update & Delete Plant
// ===============================

router
.route("/:id")
.get(wrapAsync(plantController.showPlant))
.put(wrapAsync(plantController.updatePlant))
.delete(wrapAsync(plantController.destroyPlant));

// ===============================
// Render Edit Plant Form
// ===============================

router.get(
    "/:id/edit",
    wrapAsync(plantController.renderEditForm)
);

module.exports = router;