const db = require("../models");

module.exports = {
    getUser: (req, res, next) => {
        console.log(req.user);
        if(req.user) {
            return res.json({ user: req.user });
        } else {
            return res.json({ user: null });
        }
    },
    register: (req, res) => {
        const { firstName, lastName, username, password } = req.body;
        db.User.findOne({ "username": username }, (err, userMatch) => {
            if(userMatch) {
                return res.json({
                    error: `${username} username already exists`
                });
            }
            const newUser = new db.User({
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": password
            });
            newUser.save((err, savedUser) => {
                if(err) {
                    return res.json(err);
                }
                return res.json(savedUser);
            });
        });
    },
    logout: (req, res) => {
        if(req.user) {
            req.session.destroy();
            res.clearCookie("connect.sid");
            return res.json({ message: "logged out" });
        } else {
            return res.json({ message: "No user to log out." });
        }
    },
    auth: function(req, res, next) {
        console.log(req.body);
        next();
    },
    authenticate: (req, res) => {
        console.log("POST to /login");
        const user = JSON.parse(JSON.stringify(req.user));
        const cleanUser = Object.assign({}, user);
        if(cleanUser) {
            console.log(`Deleting ${cleanUser.password}`);
            delete cleanUser.password;
        }
        res.json({ user: cleanUser });
    },
    addSavedArticle: (req, res) => {
        db.User
        .findByIdAndUpdate(req.params.id, {$push: {savedArticles: req.body.articleId}})
        .then(edited => res.json(edited))
        .catch(err => res.status(422).json(err));
    },
    removeSavedArticle: (req, res) => {
        db.User
        .findByIdAndUpdate(req.params.id, {$pull: {savedArticles: req.body.articleId}})
        .then(edited => res.json(edited))
        .catch(err => res.status(422).json(err));
    },
    getSavedArticles: (req, res) => {
        db.User
        .findById(req.params.id)
        .populate("savedArticles")
        .then(dbSArticle => res.json({savedArticles: dbSArticle.savedArticles}))
        .catch(err => res.status(422).json(err)); 
    }
};