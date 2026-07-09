const User = require("../models/user");
// Render Signup Form
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
};
// Signup User
module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({
            username,
            email
        });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Virtual Herbal Garden!");
            res.redirect("/plants");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};
// Render Login Form
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login");
};
// Login User
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome Back!");
    let redirectUrl = res.locals.redirectUrl || "/";
    res.redirect(redirectUrl);
};
// Logout User
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are Logged Out!");
        res.redirect("/plants");
    });
};