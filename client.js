const axios = require("axios");
const BASE_URL = "http://localhost:3000";

// Async function to get all books
async function getAllBooks() {
  try {
    const res = await axios.get(`${BASE_URL}/books`);
    console.log("All Books:", res.data);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// Promises for search
function getBookByISBN(isbn) {
  axios.get(`${BASE_URL}/books/isbn/${isbn}`)
    .then(res => console.log("Book by ISBN:", res.data))
    .catch(err => console.error("Error:", err.message));
}

function getBooksByAuthor(author) {
  axios.get(`${BASE_URL}/books/author/${author}`)
    .then(res => console.log("Books by Author:", res.data))
    .catch(err => console.error("Error:", err.message));
}

function getBooksByTitle(title) {
  axios.get(`${BASE_URL}/books/title/${title}`)
    .then(res => console.log("Books by Title:", res.data))
    .catch(err => console.error("Error:", err.message));
}

// Call all test functions
getAllBooks();
getBookByISBN("12345");
getBooksByAuthor("john");
getBooksByTitle("Node Basics");
