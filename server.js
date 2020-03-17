if (process.env.NODE_ENV !== 'production') {
    console.log('loading dev environments');
    require('dotenv').config();
}

require("dotenv").config();

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dbConnection = require("./server/db");
const routes = require("./server/routes");
const passport = require("./server/passport");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.APP_SECRET || "this is the default passphrase",
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
    const path = require("path");
    console.log("You are in the production env");
    app.use("/static", express.static(path.join(__dirname, "../client/build/static")));
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build/"))
    });
}

app.use(routes);

app.use(function (err, req, res, next) {
    console.log("====ERROR====");
    console.error(err.stack);
    res.status(500);
});

app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});