

const connect = require("./utils/connect.js");
const express = require("express");
const Books = require("./Models/book.js");
const port = 3000;
const cors = require("cors");

// we have execute express function
const app = express();
connect();
//middleware 
app.use(express.json());
app.use(cors({
    orgin:"*"
}))

// To start the server
app.listen(port, function () {
    console.log(`Server is running on port  ${port}`)
})

// Route Title: Get All Books
// Endpoint: GET /api/books
// Description: Retrieve a list of all books in the collection.
app.get("/api/book", async function (req, res){
    try {
        const book = await Books.find();
        if (!book) {
            res.status(404).json({
                message: "not data is found"
            })
        }
        else {
            res.status(200).json({
                book
            })
        }
    } catch (err) {
        res.status(500).json({err})
    }
    
})

// Route Title: Create a New Book
// Endpoint: POST /api/books
// Description: Add a new book to the collection.
app.post("/api/book", async function (req, res) {
    try {
        let bookData = req.body;
        let newBook = await Books.create(bookData);
        res.status(200).json({ success:true,newBook });
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// Route Title: Delete a Book
// Endpoint: DELETE /api/books/:id
// Description: Remove a book from the collection by specifying its ID.

app.delete("/api/book/:id", async function (req, res) {
    try {
        const { id } = req.params;
        const deletedBook = await Books.findByIdAndDelete(id);
        if (!deletedBook) {
            res.status(200).json({ message: `the thing which you are looking is not avaiable ${id} ` })
        } else {

            res.status(200).json({ message: `delete successfully ${id} `, deletedBook })
        }
    }
    catch (err) {
        res.status(500).json(err);
    }

})

// Route Title: Update a Book
// Endpoint: PATCH /api/books/:id
// Description: Update an existing book by providing its ID.
app.patch("/api/book/:id", async function (req, res) {
    try {
        const { id } = req.params;
        const updatedBook = await Books.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            res.status(200).json({ message: `Book withh the ${id} is not avaiable ` })
        } else {

            res.status(200).json({ success: true, updatedBook })
        }
    } catch (err) {
        res.status(500).json(err);
   }

})

// Get Book Details
// GET /api/books/:id
// Retrieve details of a specific book by providing its ID.
app.get("/api/book/:id", async function (req, res) {
    try {
        const { id } = req.params;
        const book = await Books.findById(id);
        if (!book) {
            res.status(200).json({ message: `Book with the ${id} is not avaiable ` })
        } else {
            res.status(200).json({ success: true, book })
        }
    } catch (err) {
        res.status(500).json(err);
    }

})