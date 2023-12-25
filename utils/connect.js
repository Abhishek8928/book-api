const express = require("express");
const mongoose = require("mongoose");



async function connectToDb() {
    try {
        await mongoose.connect("mongodb+srv://abhishek:Abhishek%408928@restapi.iho90eg.mongodb.net/")
        .then(console.log("connected to db"))
        
    } catch (err) {
        console.log(err);
    }
}


module.exports = connectToDb;


