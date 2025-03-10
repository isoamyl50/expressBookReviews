import axios from "axios";

// Get the list of books available in the shop using async-await
async function getBooks() {
  try {
    const response = await axios.get('http://localhost:8080/');
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Test getting the list of books
getBooks()


// Get book details based on ISBN using async-await
async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`http://localhost:8080/isbn/${isbn}`);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching book details:", error);
  }
}
// Test getting book details based on ISBN
getBookByISBN(1);

// Get book details based on author using async-await
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`http://localhost:8080/author/${author}`);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching books by author:", error);
  }
}
// Test getting book details based on author
getBooksByAuthor('Chinua Achebe');

// Get book details based on title using async-await
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:8080/title/${title}`);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching books by title:", error);
  }
}
// Test getting book details based on title
getBooksByTitle('Things Fall Apart');