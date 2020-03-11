const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const db = require("../models");

passport.serializeUser((user, done) => {
    console.log("Serialize called");
    console.log(user);
    done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
    console.log("Deserialize called");
    db.User.findOne(
        { _id: id },
        "firstName lastName username",
        (err, user) => {
            console.log("Deserialize user called");
            console.log(user);
            done(null, user)
        }
    );
});

passport.use(LocalStrategy);

module.exports = passport;