const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
mongoose.promise = Promise;

const userSchema = new Schema({
    firstName: { 
        type: String,
        unique: false
    },
    lastName: {
        type: String,
        unique: false
    },
    username: {
        type: String,
        unique: false,
        required: true
    },
    password: {
        type: String,
        unique: false,
        required: true
    },
    savedArticles: [{
        type: Schema.Types.ObjectId,
        ref: "Article"
    }]
});

userSchema.methods = {
    checkPassword: function(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
};

userSchema.pre("save", function(next) {
    if(!this.password) {
        console.log("Please create a password.");
        next();
    } else {
        this.password = this.hashPassword(this.password);
        next();
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;