const mongoose = require("mongoose");

let Schema = mongoose.Schema;

// create the schema for a favorite article
const FavoriteSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: "title is required"
    },
    link: {
        type: String,
        trim: true,
        required: "link is required"
    },
    note: {
        type: String,
        trim: true
    }
});

// create the model using the schema above
const Favorite = mongoose.model("Favorite", FavoriteSchema);

// be sure to export the Article model
module.exports = Favorite;

