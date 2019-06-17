const express = require("express");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const axios = require("axios");
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 3000;

var db = require("./models");

// connect to the mongodb installation
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const app = express();
// configure handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Require the routes
require("./routes/htmlRoutes")(app);
require("./routes/favourites")(app);


app.listen(PORT, () => {
    console.log(`Scraper app is listening on port ${PORT}`);
});