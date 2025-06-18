const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();

const PORT = 3000;
const JWT_SECRET = "your-secret-key";

app.use(bodyParser.json());

let users = [];
let books = {
  "12345": {
    title: "Node Basics",
    author: "John Smith",
    reviews: {},
  },
  "67890": {
    title: "Express in Action",
    author: "Jane Doe",
    reviews: {},
  },
};

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token required" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
}

// Register
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find((u) => u.username === username)) {
    return res.status(409).json({ message: "User already exists" });
  }
  users.push({ username, password });
  res.status(201).json({ message: "User registered successfully" });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Get book by ISBN
app.get("/books/isbn/:isbn", (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// Search by author
app.get("/books/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const result = Object.values(books).filter((b) => b.author.toLowerCase().includes(author));
  res.json(result);
});

// Search by title
app.get("/books/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const result = Object.values(books).filter((b) => b.title.toLowerCase().includes(title));
  res.json(result);
});

// Get book reviews
app.get("/books/:isbn/reviews", (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book.reviews);
});

// Add review
app.post("/books/:isbn/review", verifyToken, (req, res) => {
  const { review } = req.body;
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Book not found" });
  book.reviews[req.user.username] = review;
  res.json({ message: "Review added" });
});

// Modify review
app.put("/books/:isbn/review", verifyToken, (req, res) => {
  const { review } = req.body;
  const book = books[req.params.isbn];
  if (!book || !book.reviews[req.user.username]) {
    return res.status(404).json({ message: "Review not found" });
  }
  book.reviews[req.user.username] = review;
  res.json({ message: "Review updated" });
});

// Delete review
app.delete("/books/:isbn/review", verifyToken, (req, res) => {
  const book = books[req.params.isbn];
  if (!book || !book.reviews[req.user.username]) {
    return res.status(404).json({ message: "Review not found" });
  }
  delete book.reviews[req.user.username];
  res.json({ message: "Review deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
