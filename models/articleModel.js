const mongoose = require("mongoose");

let Schema = mongoose.Schema;

// create the schema for an article
const ArticleSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: "title is required"
    },
    link: {
        type: String,
        trim: true,
        required: "link is required"
    }
});

// create the model using the schema above
const Article = mongoose.model("Article", ArticleSchema);

// be sure to export the Article model
module.exports = Article;

