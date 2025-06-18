# 📚 Book Review App – Node.js & Express

This is a simple server-side Book Review application built with **Node.js**, **Express**, and **JWT authentication**.

## ✅ Features

- View all books in the shop
- Search books by ISBN, author, or title
- View book reviews
- Register & login as a user
- Add, modify, and delete reviews (only for logged-in users)
- Secure access using JWT



## 🧪 Test with Postman

- `GET /books` – View all books
- `POST /register` – Register user
- `POST /login` – Login and get JWT token
- `POST/PUT/DELETE /books/:isbn/review` – Add/edit/delete reviews (JWT required)
