const express = require("express");
let books = require("./booksdb.js");
// const books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
    //Write your code here
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Username and password are required" });
    }
    const userExists = users.find((u) => u?.username === username);

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    users.push({ username, password });
    return res.status(200).json({
        message: "Customer successfully registered. Now you can login",
    });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
    //Write your code here
    let allBooks = books;
    return res
        .status(200)
        .json({ data: allBooks, message: "successfully fetched all books" });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
    //Write your code here
    const isbnId = req.params.isbn;
    const targetBook = books[isbnId];

    return res
        .status(200)
        .json({ book: targetBook, message: "successfully fetched book" });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
    //Write your code here
    const author = req.params.author;
    const allBooks = Object.values(books);
    const filteredBooks = allBooks.filter((book) => book.author === author);

    return res.status(200).json({
        bookByauthor: filteredBooks,
        message: "successfully fetched books by author",
    });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
    //Write your code here
    const title = req.params.title;
    const allBooks = Object.values(books);
    const filteredBooks = allBooks.filter((book) => book.title === title);

    return res.status(200).json({
        bookbytitle: filteredBooks,
        message: "successfully fetched books by title",
    });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
    //Write your code here
    const isbnId = req.params.isbn;
    const targetBook = books[isbnId];
    const review = targetBook.reviews;
    return res
        .status(200)
        .json({ review: review, message: "successfully fetched review" });
});

module.exports.general = public_users;
