const db = require("../models");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
    {
        usernameField: "username"
    },
    function(username, password, done) {
        db.User.findOne({ "username": username }, (err, userMatch) => {
            if(err) {
                return done(err);
            }
            if(!userMatch) {
                return done(null, false, { message: "Username does not match" });
            }
            if(!userMatch.checkPassword(password)) {
                return done(null, false, { message: "Incorrect password"});
            }
            return done(null, userMatch);
        });
    }
);

module.exports = strategy;