const ExpressError = require("./utils/ExpressError");

const { plantSchema, diseaseSchema } = require("./schema");

// ======================================
// Authentication Middleware
// ======================================

module.exports.isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {

        req.session.redirectUrl = req.originalUrl;

        req.flash("error", "You must be logged in first!");

        return res.redirect("/login");
    }

    next();
};

// ======================================
// Save Redirect URL
// ======================================

module.exports.saveRedirectUrl = (req, res, next) => {

    if (req.session.redirectUrl) {

        res.locals.redirectUrl = req.session.redirectUrl;
    }

    next();
};

// ======================================
// Admin Authorization
// ======================================

module.exports.isAdmin = (req, res, next) => {

    if (!req.user || req.user.role !== "admin") {

        req.flash("error", "Only Admin can perform this action.");

        return res.redirect("/plants");
    }

    next();
};

// ======================================
// Validate Plant
// ======================================

module.exports.validatePlant = (req, res, next) => {

    const { error } = plantSchema.validate(req.body);

    if (error) {

        const errMsg = error.details.map(el => el.message).join(", ");

        throw new ExpressError(400, errMsg);
    }

    next();
};
// ======================================
// Validate Disease
// ======================================

module.exports.validateDisease = (req, res, next) => {

    const disease = req.body.disease;

    const stringToArray = (value) => {

        if (!value) return "";

        if (Array.isArray(value)) return value.join(", ");

        return value;

    };

    if (disease) {

        disease.symptoms = stringToArray(disease.symptoms);

        disease.causes = stringToArray(disease.causes);

        disease.prevention = stringToArray(disease.prevention);

    }

    const { error } = diseaseSchema.validate(req.body);

    if (error) {

        const errMsg = error.details
            .map(el => el.message)
            .join(", ");

        throw new ExpressError(400, errMsg);

    }

    next();

};