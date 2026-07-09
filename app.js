require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");

// Models
const User = require("./models/user");
const Plant = require("./models/plant");
const Disease = require("./models/disease");

// Routes
const searchRoutes = require("./routes/search");
const plantRoutes = require("./routes/plant");
const diseaseRoutes = require("./routes/disease");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

// Utils
const ExpressError = require("./utils/ExpressError");

const app = express();


// =====================================================
// MongoDB Connection
// =====================================================

const MONGO_URL =
    process.env.ATLASDB_URL ||
    "mongodb://127.0.0.1:27017/virtualHerbalGarden";

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("✅ Database Connected");
    })
    .catch((err) => {
        console.log(err);
    });


// =====================================================
// View Engine
// =====================================================

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));


// =====================================================
// Middlewares
// =====================================================

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));


app.use(
    mongoSanitize({
        replaceWith: "_",
    })
);

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);


// =====================================================
// Session Configuration
// =====================================================

const sessionOptions = {
    secret:
        process.env.SECRET ||
        "virtual-herbal-garden-secret-key",

    resave: false,

    saveUninitialized: false,

    cookie: {
        httpOnly: true,

        expires:
            Date.now() + 7 * 24 * 60 * 60 * 1000,

        maxAge:
            7 * 24 * 60 * 60 * 1000,
    },
};

app.use(session(sessionOptions));

app.use(flash());


// =====================================================
// Passport Configuration
// =====================================================

app.use(passport.initialize());

app.use(passport.session());

passport.use(
    new LocalStrategy(User.authenticate())
);

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());


// =====================================================
// Global Variables
// =====================================================

app.use((req, res, next) => {

    res.locals.success = req.flash("success");

    res.locals.error = req.flash("error");

    res.locals.currUser = req.user;

    next();

});


// =====================================================
// Routes
// =====================================================

app.get("/", async (req, res, next) => {

    try {

        const totalPlants =
            await Plant.countDocuments();

        const totalDiseases =
            await Disease.countDocuments();

        const totalCategories =
            (await Plant.distinct("plantType")).length;

        const totalAyushSystems =
            (await Plant.distinct("ayushSystem")).length;

        const featuredPlants =
            await Plant.find({})
                .limit(4);
        const featuredDiseases =
            await Disease.find({})
                .limit(6);
        const categories =
            await Plant.distinct("plantType");

        res.render("home", {

            totalPlants,

            totalDiseases,

            totalCategories,

            totalAyushSystems,

            featuredPlants,

            featuredDiseases,

            categories

        });

    }

    catch(err){

        next(err);

    }

});

app.use("/plants", plantRoutes);

app.use("/diseases", diseaseRoutes);

app.use("/", userRoutes);

app.use("/search", searchRoutes);

app.use("/admin", adminRoutes);


// =====================================================
// 404 Handler
// =====================================================

app.all("*", (req, res, next) => {

    next(new ExpressError(404, "Page Not Found"));

});


// =====================================================
// Global Error Handler
// =====================================================

app.use((err, req, res, next) => {

    const { statusCode = 500 } = err;

    if (!err.message) {
        err.message = "Something Went Wrong!";
    }

    res.status(statusCode).render("error", {
        err,
    });

});


// =====================================================
// Server
// =====================================================

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

    console.log(`🚀 Server Running On Port ${PORT}`);

});