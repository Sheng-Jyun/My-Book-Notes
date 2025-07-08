# 📚 Book Notes Web App

**Book Notes** is a beautifully designed web application that helps you log, rate, and review the books you've read. It features an elegant interface, inline editing, automatic cover fetching via public APIs, and Amazon integration for easy lookup.

---

## 🌟 Features

- ✅ Add books with title, author, ISBN, rating (1–10), date read, and personal review
- 🌐 **Automatic cover image retrieval** via [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers)
- 🔗 **Clickable cover images** redirect to Amazon using ISBN or keyword-based fallback
- ✏️ Edit title, author, rating, and review directly in place — no page reload needed
- 🔍 “Show more” toggle for long reviews to keep the interface neat
- 🗑️ Delete books instantly from the list
- 🎨 Clean, responsive design with elegant typography (Playfair Display, Georgia, Inter)
- 💾 Backend with Node.js + Express and **PostgreSQL database**

## 📁 Folder Structure

---

```

My-Book-Notes/
├── views/                   # EJS templates for rendering HTML pages
│   └── index.ejs            # Main UI with book form and list
├── public/                  # Static files (CSS, images, JS)
│   └── style.css            # Custom styles for the UI
├── db/                      # (Optional) DB setup or SQL files
│   └── schema.sql           # PostgreSQL table creation (if used)
├── .gitignore               # Files and folders to ignore in Git
├── README.md                # Project documentation
├── demo.gif                 # Optional: animation
├── index.js                # Express.js backend server
├── package.json             # NPM dependencies and scripts
└── books.db                 # (If SQLite used, or replace with PostgreSQL connection)

```
---

## 🖼️ Preview

![Demo Animation](./demo.gif)

---

## ⚙️ Tech Stack

- **Frontend**: HTML, CSS (custom), JavaScript
- **Backend**: Node.js, Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Database**: PostgreSQL
- **API Integration**:
  - [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers) — fetch cover images using ISBN
  - Amazon — auto-generate product URLs for book search

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/book-notes-app.git
cd book-notes-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the PostgreSQL database

Create a PostgreSQL database named `booknotes` (or your preferred name):

```bash
createdb booknotes
```

Then connect to the DB and run:

```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  isbn TEXT,
  rating INTEGER,
  date_read DATE,
  review TEXT,
  cover_url TEXT
);
```

### 4. Configure the database connection

Create a `.env` file in the root directory:

```env
SESSION_SECRET="TOPSECRETWORD"
PG_USER="postgres" (or your PG_USER name)
PG_HOST="localhost"
PG_DATABASE="book_notes" (or your database name)
PG_PASSWORD="YourPassword"
PG_PORT="YourPort"
```

Replace `username`, `password`, and `booknotes` with your actual PostgreSQL credentials.

### 5. Start the app

```bash
node server.js
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## ✍️ How It Works

- Fill out the form to add a new book.
- Your book appears as a styled card with:
  - Cover image (linked to Amazon)
  - Title, author, rating, review
- Click **Edit** to modify details inline.
- Click **Show more** to expand longer reviews.
- All updates happen seamlessly via AJAX (no page reload).

---

## 🔌 API Integration Highlights

- 🖼️ **Open Library Covers API** is used to retrieve high-quality cover images from ISBN numbers
- 🛒 **Amazon integration**:
  - If ISBN is available: direct link to product page
  - If missing: fallback to search query using title

> This makes your library not only functional but **interactive and resourceful** for future reference or book shopping.

---

## 📖 Intro Text

> “Books I’ve read. Tiny summary but detailed notes for each.  
> Use the ISBN number to find it from your local library or anywhere else.  
> This page will constantly update as I read more, so bookmark it if you want to check back in a few months.”

---

## 🧠 Fonts & Styling

- `Playfair Display` for intros
- `Georgia` for book titles and review text
- `Roboto` for authors
- `Inter` for forms and layout

All fonts loaded via Google Fonts for consistency and elegance.

---

## 🚧 Future Enhancements

- 📌 Genre tags and filtering
- 📤 Export data to JSON or CSV
- 🔐 User accounts and authentication
- 🔄 Goodreads sync

---

## 📄 License

MIT License  
© 2025 Sheng-Jyun Cai