import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

dotenv.config();
const { Client } = pg;

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection using Client and env variables
const db = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

// View engine and middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Home page
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY date_read DESC");
    const books = await Promise.all(
      result.rows.map(async (b) => {
        // Example: Use Axios to verify cover availability (optional)
        const cover_url = `https://covers.openlibrary.org/b/isbn/${b.isbn}-L.jpg`;
        try {
          await axios.get(cover_url); // Will throw if image is not found
          return { ...b, cover_url };
        } catch {
          return { ...b, cover_url: "/no-cover.png" }; // Fallback image
        }
      })
    );
    res.render("index", { books });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading books");
  }
});

// Add book
app.post("/add", async (req, res) => {
  const { title, author, isbn, rating, review, date_read } = req.body;
  try {
    await db.query(
      "INSERT INTO books (title, author, isbn, rating, review, date_read) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, author, isbn, rating, review, date_read]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding book");
  }
});

// Edit form
app.post('/edit/:id', express.json(), async (req, res) => {
  const { id } = req.params;
  const { title, author, rating, review } = req.body;
  try {
    await db.query(
      'UPDATE books SET title=$1, author=$2, rating=$3, review=$4 WHERE id=$5',
      [title, author, rating, review, id]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Update book
// app.post("/update/:id", async (req, res) => {
//   const { id } = req.params;
//   const { title, author, isbn, rating, review, date_read } = req.body;
//   try {
//     await db.query(
//       "UPDATE books SET title=$1, author=$2, isbn=$3, rating=$4, review=$5, date_read=$6 WHERE id=$7",
//       [title, author, isbn, rating, review, date_read, id]
//     );
//     res.redirect("/");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error updating book");
//   }
// });

// Delete book
app.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting book");
  }
});

// Start server
app.listen(port, () => {
  console.log(`📚 Server running on http://localhost:${port}`);
});
