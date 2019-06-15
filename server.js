const express = require("express");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const axios = require("axios");
const hbs = require("express-handlebars");
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
    console.log(`ROUTE: /`);
    res.send("WELCOME TO THE SCRAPER");
});

app.listen(PORT, () => {
    console.log(`Scraper app is listening on port ${PORT}`);
});