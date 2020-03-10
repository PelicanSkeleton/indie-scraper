const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
let PORT;
if (process.env.NODE_ENV === "production"){
    PORT = process.env.PORT
} else {
    PORT = 3001;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsarticles";

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/newsarticles");
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});