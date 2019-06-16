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


app.get("/", (req, res) => {
    console.log(`ROUTE: /`);
    res.send("WELCOME TO THE SCRAPER");
});


app.get("/article", (req, res) => {
    
    // delete all existing documents 
    db.Article.deleteMany({})
    .then(data =>{
        console.log("deleted all documents")
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Error deleting old documents");
    });

    // scrape the website
    axios.get("https://www.kijiji.ca/b-house-for-sale/mississauga-peel-region/c35l1700276")
    .then(response => {

        let promise = [];

        const $ = cheerio.load(response.data);
        // TODO: empty the collection
        
        // find all title & link pairs
        $("div.title").each((i, element) => {
            let title = $(element).children().text().trim();
            let link = "https://ww.kijiji.ca" + $(element).children().attr("href");

            promise.push(
                db.Article.create({title, link})
                .then((data) =>{
                    // console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                })
            );            
        });

        Promise.all(promise).then(() => {
            console.log("ALL PROMISES ARE FINISHED");
            db.Article.find()
            .then(data => {
                console.log(data);
                res.render("article", {article: data});
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            })
        });
    })
    .catch(err => {
        console.log("????? AXIOS ERROR ?????");
        console.log(err);
        res.status(500).send(err);
    });
});


app.get("/favorite", (req, res) => {

    db.Favorite.create({
        title: "myfav article",
        link: "google.com",
        note: ""
    })
    .then((data) =>{
        console.log(data);
        res.send(data);
    })
    .catch((error) =>{
        console.log("ERROR")
        res.status(500).send(error);
    });
});


app.listen(PORT, () => {
    console.log(`Scraper app is listening on port ${PORT}`);
});