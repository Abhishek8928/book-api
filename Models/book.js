

const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({

    title: {
        type: String,
        required:true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    genre: {
        type:String,
        enum: ["Fiction", "Non-Fiction"]
    },
    date_of_publication: {
        type:String
    },
    price: {
        type: Number,
        "$gt":0

    }
},{
    timestamps: true
})


module.exports = mongoose.model("books",bookSchema)