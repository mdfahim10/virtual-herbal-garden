const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const searchController = require("../controllers/search");

// ======================================
// Universal Search
// ======================================

router.get(
    "/",
    wrapAsync(searchController.search)
);

module.exports = router;