


# Phonebook & Contact Manager (Full Stack)

A production-ready full-stack web application designed to manage personal contact information. This project focuses on seamless frontend-backend synchronization and secure data persistence using a cloud-based database.

## 🚀 Live Demo
https://fullstackopencourse-l7jx.onrender.com/

## ✨ Features
- **Full CRUD Functionality:** Create, Read, Update, and Delete contact entries.
- **Backend Validation:** Implements strict Mongoose schema validation to ensure phone numbers follow specific formats and names are unique.
- **Cloud Persistence:** Data is stored and managed using **MongoDB Atlas**.
- **Real-time Notifications:** Integrated user feedback system for successful operations and error handling (e.g., validation errors or connection issues).
- **Responsive UI:** A clean, mobile-friendly interface built with React.

## 🛠️ Tech Stack
- **Frontend:** React, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Deployment:** [e.g., Render / Fly.io]
- **Tools:** Postman, Git

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/sachindra-001/FullStackOpenCourse.git](https://github.com/sachindra-001/FullStackOpenCourse.git)
   cd part3/phonebook-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add your MongoDB URI:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3001
   ```

4. **Run the application:**
   - **Development mode:** `npm run dev`
   - **Production mode:** `npm start`

## 📡 API Endpoints
| Method | Endpoint         | Description                   |
| :---   | :---             | :---                          |
| GET    | `/api/persons`   | Get all contacts              |
| GET    | `/api/persons/:id`| Get a single contact          |
| POST   | `/api/persons`   | Add a new contact             |
| PUT    | `/api/persons/:id`| Update an existing contact    |
| DELETE | `/api/persons/:id`| Delete a contact              |

## 🧪 Key Learnings
- Managing asynchronous operations between a React frontend and an Express backend.
- Implementing centralized error-handling middleware in Node.js.
- Configuring environment variables for secure sensitive data management in production.
- Deploying a full-stack application with a build script that connects the frontend and backend.

Developed as part of the **Full Stack Open** course.
