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

// Routes
const plantRoutes = require("./routes/plant");
const diseaseRoutes = require("./routes/disease");
const userRoutes = require("./routes/user");

// Utils
const ExpressError = require("./utils/ExpressError");

const app = express();


// ======================================
// MongoDB Connection
// ======================================

require("dotenv").config();

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/virtualHerbalGarden";

main()
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}


// ======================================
// View Engine
// ======================================

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));


// ======================================
// Middlewares
// ======================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("dev"));

app.use(
    mongoSanitize({
        replaceWith: "_",
    })
);

app.use(helmet({
    contentSecurityPolicy: false,
}));


// ======================================
// Session Configuration
// ======================================

const sessionOptions = {
    secret: "virtual-herbal-garden-secret-key-2026",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));

app.use(flash());


// ======================================
// Passport Configuration
// ======================================

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());


// ======================================
// Global Variables
// ======================================

app.use((req, res, next) => {

    res.locals.success = req.flash("success");

    res.locals.error = req.flash("error");

    res.locals.currUser = req.user;

    next();

});


// ======================================
// Routes
// ======================================

app.get("/", (req, res) => {
    res.render("home", {
        success: [],
        error: [],
        currUser: null
    });
});

app.use("/plants", plantRoutes);

app.use("/diseases", diseaseRoutes);

app.use("/", userRoutes);


// ======================================
// 404 Handler
// ======================================

app.all("/{*any}", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});


// ======================================
// Global Error Handler
// ======================================

app.use((err, req, res, next) => {

    let { statusCode = 500, message = "Something Went Wrong!" } = err;

    res.status(statusCode);

    res.render("error.ejs", {
        err,
    });

});


// ======================================
// Server
// ======================================

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});