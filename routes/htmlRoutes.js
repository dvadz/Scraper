const cheerio = require("cheerio");
const mongoose = require("mongoose");
const axios = require("axios");
const exphbs = require("express-handlebars");

const db = require("../models");


module.exports = app => {
    
    app.get("/", (req, res) => {
        res.redirect("/listings");
    });
    
    // show all listings
    app.get("/listings", (req, res) => {
        
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
                    // console.log(data);
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
    
}