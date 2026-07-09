const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware");
const adminController = require("../controllers/admin");
// Show all users
router.get(
    "/users",
    isLoggedIn,
    isAdmin,
    adminController.showUsers
);
module.exports = router;
//prommote user
router.patch(
    "/users/:id/promote",
    isLoggedIn,
    isAdmin,
    adminController.promoteUser
);
//demote admin
router.patch(
    "/users/:id/demote",
    isLoggedIn,
    isAdmin,
    adminController.demoteUser
);