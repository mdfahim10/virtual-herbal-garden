const User = require("../models/user");
// Show All Users
module.exports.showUsers = async (req, res) => {
    const users = await User.find({});
    const totalUsers = users.length;
    const totalAdmins = users.filter(user => user.role === "admin").length;
    const totalNormalUsers = totalUsers - totalAdmins;
    res.render("admin/users", {
        users,
        totalUsers,
        totalAdmins,
        totalNormalUsers
    });
};
//promote users
module.exports.promoteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, {
        role: "admin"
    });
    req.flash("success", "User promoted to Admin successfully.");
    res.redirect("/admin/users");
};
//demote Admin
module.exports.demoteUser = async (req, res) => {
    const { id } = req.params;
    // Prevent self-demotion
    if (req.user._id.toString() === id) {
        req.flash("error", "You cannot remove your own admin privileges.");
        return res.redirect("/admin/users");
    }
    await User.findByIdAndUpdate(id, {
        role: "user"
    });
    req.flash("success", "Admin privileges removed successfully.");
    res.redirect("/admin/users");
};