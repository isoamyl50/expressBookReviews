const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  const user = users.filter(user => user.username == username);
  return user.length != 0;
}

const authenticatedUser = (username, password) => { //returns boolean
  const user = users.find(user => user.username === username);
  if (!user) {
    return false;
  }
  return user.password === password;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!authenticatedUser(username, password)) {
    return res.status(400).json({ message: "Invalid login." });
  }
  // Generate JWT access token
  let accessToken = jwt.sign({
    data: username
  }, 'access', { expiresIn: 60 * 60 });

  // Store access token in session
  req.session.authorization = {
    accessToken
  }

  return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const { review } = req.body;
  const username = req.user.data; // Get the username from the JWT token

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found." });
  }

  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  books[isbn].reviews[username] = review;

  return res.status(200).json({ message: "Review added successfully." });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.data; // Get the username from the JWT token

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found." });
  }

  if (!books[isbn].reviews || !books[isbn].reviews[username]) {
    return res.status(404).json({ message: "Review not found." });
  }

  delete books[isbn].reviews[username];

  return res.status(200).json({ message: "Review deleted successfully." });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
