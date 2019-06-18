const cheerio = require("cheerio");
const mongoose = require("mongoose");
const axios = require("axios");
const exphbs = require("express-handlebars");

const db = require("../models");


module.exports = app => {

    // save the listing with the given id
    app.post("/api/save/:id", (req, res) => {
        const id = req.params.id;

        console.log("EXPRESS: /api/save:id");

        // get the details of this id
        db.Article.find({_id: id})
        .then(data => {
            console.log("SUCCESS");
            console.log(data);
        
            const {title, link} = data[0];
            console.log(`title: ${title}    link: ${link}`)
            
            //  check if this listing is already stored
            db.Favorite.find({link: link})
            .then(findResponse => {
                // Already stored, now simply send a reponse
                if(findResponse.length) {
                    console.log("ALREADY STORED IN FAVOURITES")
                    res.send("Already stored")
                // not found, so store it in the favourites
                } else {
                    // store the listing to the favorites collection
                    db.Favorite.create({
                        title: title,
                        link: link,
                        note: ""
                    })
                    .then((data) =>{
                        console.log("Saved to favorites")
                        console.log(data);
                        res.send("Saved to favourites");
                    })
                    .catch((error) =>{
                        console.log("MONGODB: ERROR STORING TO FAVORITE");
                        console.log(error);
                        res.status(500).send(error);
                    });
                }
            })
            .catch(error => {
                console.log("MONGODB: Error doing a find");
                console.log(err);
                res.status(500).send(err);
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    });




}