
---
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
