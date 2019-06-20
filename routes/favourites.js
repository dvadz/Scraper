const cheerio = require("cheerio");
const mongoose = require("mongoose");
const axios = require("axios");
const exphbs = require("express-handlebars");

const db = require("../models");


module.exports = app => {

    // CREATE : save the listing with the given id
    app.post("/api/favourites/:id", (req, res) => {
        console.log("EXPRESS: CREATE FAVOURITES");

        const id = req.params.id;

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

    // READ : find one with the given _id
    app.get("/api/favourites/:id", (req, res) => {
        console.log(`EXPRESS: READ FAVOURITES`);
        const id = req.params.id;
        db.Favorite.find({_id: id})
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(err);
            });
    });

    // UPDATE:
    app.put("/api/favourites/:id", (req, res) => {
        console.log(`EXPRESS: UPDATE FAVOURITES`);
        console.log(req.body);
        db.Favorite.update({_id: req.params.id}, req.body)
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(error);
            });
    });

    // DELETE: 
    app.delete("/api/favourites/:id", (req, res) => {
        console.log("EXPRESS: DELETE FAVOURITES")
        console.log(req.params.id);
        // remove the listing from the favourites
        db.Favorite.findByIdAndDelete({_id: req.params.id})
            .then(data => {
                console.log(data);
                res.send(data);
            })
            .catch(err => {
                console.log(data);
                res.status(500).send(err);
            });
    });
}