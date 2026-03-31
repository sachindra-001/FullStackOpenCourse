# 📝 Blog List Application

A full-stack blog management application built with the **MERN stack** as part of the [University of Helsinki — Full Stack Open](https://fullstackopen.com/) course (Part 4).

The app allows users to register, log in, and manage a shared list of blog posts — including adding new blogs, liking posts, and deleting their own entries.

---


## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose), MongoDB Atlas |
| Auth | JWT (JSON Web Tokens), Bcrypt |
| Testing | Jest, Supertest |
| Tools | Git, Postman, Linux |

---

## ✨ Features

- 🔐 **User Authentication** — Secure register & login with JWT tokens and Bcrypt password hashing
- 📝 **Full CRUD** — Create, read, update (likes), and delete blog posts
- 🔒 **Protected Routes** — Only authenticated users can add blogs; only the creator can delete their own
- 🧪 **Integration Tests** — Comprehensive test suite using Jest & Supertest covering all API endpoints
- ☁️ **Cloud Database** — Data persisted on MongoDB Atlas

---

## 📁 Project Structure

```
BlogApp_backend/
├── controllers/
│   ├── blogs.js        # Blog route handlers (CRUD)
│   └── users.js        # User registration handler
├── models/
│   ├── blog.js         # Mongoose Blog schema
│   └── user.js         # Mongoose User schema
├── tests/
│   ├── blog_api.test.js  # Integration tests for blog endpoints
│   └── user_api.test.js  # Integration tests for user endpoints
├── utils/
│   ├── config.js       # Environment variable management
│   ├── logger.js       # Custom logger utility
│   └── middleware.js   # Token extractor, error handler
├── app.js              # Express app setup
└── index.js            # Server entry point
```

---

## ⚙️ How to Run Locally

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone https://github.com/sachindra/FullStackOpenCourse.git
cd FullStackOpenCourse/part4/BlogApp_backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
TEST_MONGODB_URI=your_test_database_connection_string
PORT=3003
SECRET=your_jwt_secret_key
```


### 4. Start the server
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

The API will be running at `http://localhost:3003`

---

## 🧪 Running Tests

```bash
npm test
```

Tests use a **separate test database** (`TEST_MONGODB_URI`) so your development data is never affected.

The test suite covers:
- Adding a valid blog post
- Verifying the `likes` field defaults to 0
- Rejecting blogs with missing `title` or `url` (400 Bad Request)
- Deleting a blog (authenticated user only)
- Invalid/missing token returns 401 Unauthorized

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/login` | Login and receive JWT token |

### Users
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users` | Register a new user |
| GET | `/api/users` | Get all users (with blogs populated) |

### Blogs
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/blogs` | Get all blogs | ❌ |
| POST | `/api/blogs` | Add a new blog | ✅ |
| PUT | `/api/blogs/:id` | Update likes on a blog | ❌ |
| DELETE | `/api/blogs/:id` | Delete a blog | ✅ (owner only) |

---

## 📚 Course Reference

This project was built following **Part 4** of the Full Stack Open curriculum:
- [Part 4a — Structure of backend application](https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing)
- [Part 4b — Testing the backend](https://fullstackopen.com/en/part4/testing_the_backend)
- [Part 4c — User administration](https://fullstackopen.com/en/part4/user_administration)
- [Part 4d — Token authentication](https://fullstackopen.com/en/part4/token_authentication)

---

## 👤 Author

**Sachindra**
- GitHub: [@sachindra-001](https://github.com/sachindra-001)
- LinkedIn: [linkedin.com/in/sachindra](https://linkedin.com/in/sachindra)
- LeetCode: [leetcode.com/u/sachindravandse](https://leetcode.com/u/sachindravandse/)
