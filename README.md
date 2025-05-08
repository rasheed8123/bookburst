# 📚 BookBurst — Your Personal Reading Log & Discovery Hub

**BookBurst** is a lightweight fullstack web application for readers who want to track their books, share personal takeaways, and explore community-driven book trends — all without the noise of traditional social media.

## ✨ Features

### 🔐 Authentication & Authorization
- Secure login/signup with email and password
- Auth-protected views for bookshelf and review management
- Public users can explore shared shelves and reviews (read-only)

### 📚 My Bookshelf
- Add books manually or via an external API (e.g. Google Books)
- Organize books by reading status: _Reading_, _Finished_, _Want to Read_
- Rate books, add notes, and log progress
- Tabbed + filtered bookshelf UI
- Last selected tab (e.g. "Finished") is remembered via **cookies**

### ✍️ Review System
- Write one-time, permanent reviews for books
- Markdown or rich text support (optional)
- 1–5 star rating + “Would recommend?” checkbox
- Publicly visible with:
  - Author alias
  - Submission date
  - Non-editable after submission

### 🌐 Explore Feed
- Trending books (most added to shelves)
- Recent reviews from all users
- Most wishlisted / most finished
- Genre filter and tabbed view (Trending, New Reviews, Top Rated)
- Last selected tab is remembered with **cookies**

### 👤 Public Profiles
- Public-facing shelves and reviews by status
- Simple, quiet discovery — no followers or messaging
- Accessible via `/users/:username`

### 📈 Reading Timeline
- A chronological view of books marked as _Finished_
- Timeline grouped by month/year
- Click to expand and read past reviews

### 📖 Book Detail Page
- Detailed metadata (title, author, genre, etc.)
- Cover image and description
- Average user rating
- Paginated list of public reviews

---

## ⚙️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Context API + cookies
- TailwindCSS or Material UI

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT-based authentication
- Cookie-parser for personalization

---

## 🗂 Project Structure

