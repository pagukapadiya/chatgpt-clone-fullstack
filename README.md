# 📌 ChatGPT Clone Fullstack

A complete **ChatGPT-style web application** built with **React + TypeScript + TailwindCSS** on the frontend and **Node.js + Express + TypeScript** on the backend.

This repository provides a real-time AI chat interface with session management, dark/light theme toggle, responsive design, and a clean modern UI.

---

## 🚀 Features

### 🖥 Frontend (React + TypeScript + TailwindCSS)
- Responsive chat interface for all devices
- Dark/Light theme toggle with persistence
- Collapsible sidebar with session history
- Real-time messages with typing indicators
- Structured data display (tables)
- Like/Dislike feedback UI

### 🧠 Backend (Node.js + Express + TypeScript)
- RESTful API server
- MVC architecture
- Input validation
- Centralized error handling
- Logging support

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, TypeScript, TailwindCSS |
| Backend | Node.js, Express, TypeScript |
| API | REST APIs |
| Styling | TailwindCSS |
| Packaging | Node/npm |

---

## 📂 Project Structure

```txt
chatgpt-clone-fullstack/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── styles/
│   │   └── main.tsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── server.ts
│   ├── .env
│   └── tsconfig.json
│
└── README.md
```

## 📦 Getting Started

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/pagukapadiya/chatgpt-clone-fullstack.git
cd chatgpt-clone-fullstack
```

### 2️⃣ Install Dependencies
```bash
cd frontend
npm install

cd ../backend
npm install
```

### 3️⃣ Environment Variables
Create a .env file inside the backend folder:
```bash
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
API_PREFIX=/api
```
### 4️⃣ Run the Application
Start Backend Server
```bash
cd backend
npm run dev
```

Start Frontend Application
```bash
cd frontend
npm run dev
```
