const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const diseaseController = require("../controllers/disease");
const {
    isLoggedIn,
    validateDisease,
    isAdmin,
} = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });
// Show All Diseases & Create Disease
router
.route("/")
.get(isLoggedIn, wrapAsync(diseaseController.index))
.post(
    isLoggedIn,
    isAdmin,
    upload.single("diseaseImage"),
    validateDisease,
    wrapAsync(diseaseController.createDisease)
);
// Render New Disease Form
router.get(
    "/new",
    isLoggedIn,
    isAdmin,
    diseaseController.renderNewForm
);
// Show Disease
router.get(
    "/:id",
    isLoggedIn,
    wrapAsync(diseaseController.showDisease)
);
// Render Edit Form
router.get(
    "/:id/edit",
    isLoggedIn,
    isAdmin,
    wrapAsync(diseaseController.renderEditForm)
);
// Update Disease
router.put(
    "/:id",
    isLoggedIn,
    isAdmin,
    upload.single("diseaseImage"),
    validateDisease,
    wrapAsync(diseaseController.updateDisease)
);
// Delete Disease
router.delete(
    "/:id",
    isLoggedIn,
    isAdmin,
    wrapAsync(diseaseController.destroyDisease)
);
module.exports = router;