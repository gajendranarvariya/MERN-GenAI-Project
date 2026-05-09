# 🚀 Backend - MERN GenAI Career Assistant

An AI-powered backend application built using Node.js, Express.js, MongoDB, JWT Authentication, and Gemini AI.

This backend provides secure authentication and AI-powered career assistance features such as:

- AI Resume Analysis
- Job Match Score
- ATS-Friendly Resume Generation
- Behavioral Interview Questions
- Technical Interview Questions
- Skill Gap Analysis
- Personalized Preparation Plans

---

# 🧠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Token Blacklisting
- Gemini AI API
- Puppeteer (PDF Generation)
- REST API

---

# ✨ Features

## 🔐 Authentication Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Logout
- Token Blacklisting
- Password Encryption

---

## 🤖 AI Features

Users provide:

- Resume
- Job Description
- Self Description

Gemini AI generates:

- Job Match Score
- Role Title Suggestions
- Skill Gap Analysis
- Behavioral Interview Questions & Answers
- Technical Interview Questions
- Personalized Preparation Plan
- ATS-Friendly Resume

---

## 📄 Resume PDF Generation

- ATS-Friendly Resume Generation
- Resume Export as PDF
- Puppeteer-based PDF Rendering
- Professional Resume Formatting

---

# 📁 Folder Structure

```bash
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   └── ai.controller.js
│
├── middleware/
│   ├── auth.middleware.js
│   └── error.middleware.js
│
├── models/
│   ├── user.model.js
│   └── blacklist.model.js
│
├── routes/
│   ├── auth.routes.js
│   └── ai.routes.js
│
├── services/
│   ├── gemini.service.js
│   └── pdf.service.js
│
├── utils/
│   └── helpers.js
│
├── prompts/
│   └── ai.prompts.js
│
├── generated-pdf/
│
├── app.js
├── server.js
├── package.json
└── .env

```


---

# Frontend README.md

# 🚀 Frontend - MERN GenAI Career Assistant

Frontend application built using React.js with Context API and Axios.

This frontend integrates AI-powered APIs and provides users with a clean UI for:

- Authentication
- Resume Analysis
- AI Career Insights
- ATS Resume Generation
- PDF Download

---

# 🧠 Tech Stack

- React.js
- Context API
- Axios
- React Router DOM
- CSS / Tailwind CSS / Bootstrap

---

# ✨ Features

- User Authentication
- Protected Routes
- AI Result Dashboard
- Resume Upload UI
- ATS Resume Generator
- PDF Download
- Context API State Management
- Axios API Integration

---

# 🏗️ Frontend Architecture

This project follows a **4-Layer Architecture**:

## 1️⃣ UI Layer

Contains:

- Components
- Pages
- Layouts
- Styling

---

## 2️⃣ State Layer

Contains:

- Context API
- Global State
- Authentication State

---

## 3️⃣ API Layer

Contains:

- Axios Instance
- API Services
- Request Handling

---

## 4️⃣ Hook Layer

Contains:

- Custom Hooks
- Reusable Business Logic

---

# 📁 Folder Structure

```bash
frontend/
│
├── public/
│
├── src/
│   │
│   ├── api/
│   │   ├── axios.js
│   │   └── auth.api.js
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useAI.js
│   │
│   ├── state/
│   │   ├── AuthContext.jsx
│   │   └── AIContext.jsx
│   │
│   ├── ui/
│   │   ├── components/
│   │   ├── pages/
│   │   └── layouts/
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── App.js
│   └── main.jsx
│
├── package.json
└── .env

```