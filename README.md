Expense Tracker – Frontend Prototype

A React-based frontend-only Expense Tracker built as a prototype for a future full-stack expense tracking system.
This project focuses on UI/UX, client-side state management, and persistent local storage, without using any backend, server, or database.

It is designed for personal use and small private groups, with intentionally simplified authentication and storage logic.

🚀 Features

Frontend-only React application

Hardcoded login system (no signup, no OTP, no email)

Persistent data storage using browser storage

Automatic 30-day data reset logic

Expense tracking with category support

Total budget and remaining budget calculation

Interactive charts for expense visualization

Responsive design for mobile and desktop

Glassmorphism-inspired modern UI

Clean and minimal architecture

🧠 Project Purpose

This repository serves as a frontend prototype and UI foundation for a future full-stack Expense Tracker, where backend services, databases, and secure authentication can be integrated later without major architectural changes.

The focus of this phase is:

Validating UI/UX

Designing scalable frontend structure

Practicing client-side data persistence

Building realistic expense tracking flows

🛠 Tech Stack

React

JavaScript

Recharts (for charts)

CSS (single global stylesheet)

📁 Folder Structure
src
│
├── components
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── MobileMenu.jsx
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Modal.jsx
│   ├── ExpensePie.jsx
│   ├── ExpenseBar.jsx
│
├── pages
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Expenses.jsx
│   ├── AddExpense.jsx
│   ├── Budget.jsx
│
├── context
│   ├── AuthContext.jsx
│   ├── ExpenseContext.jsx
│
├── hooks
│   ├── useAuth.js
│   ├── useExpenses.js
│
├── data
│   ├── users.js
│   ├── categories.js
│
├── utils
│   ├── storage.js
│   ├── resetCheck.js
│
├── App.jsx
├── main.jsx
└── styles.css

🔐 Authentication (Prototype)

Login is handled using hardcoded credentials

No signup or password recovery

Authentication state is stored locally

Intended only for personal or private usage

💾 Data Persistence

Expenses, budget, and user session are stored locally in the browser

Data persists after page refresh

Each user has isolated local data

⏳ 30-Day Auto Reset Logic

User data automatically resets after 30 days

Reset logic runs on app load or login

Simulates real-world data lifecycle handling without a backend

📊 Charts & Visualization

Pie charts for category-based expenses

Bar charts for expense distribution

Built using Recharts

Fully client-side rendering

🎨 UI / UX

Glassmorphism-inspired design

Clean, modern layout

Smooth transitions and animations

Mobile-first responsive behavior

Hamburger menu for smaller screens

🚧 Limitations

No backend or server

No real authentication security

Data is browser-specific

Not suitable for public or production use

🔮 Future Full-Stack Roadmap

Planned future enhancements:

Backend API integration

Database storage (MongoDB / PostgreSQL)

Secure authentication (JWT / OAuth)

User roles and permissions

Cloud deployment

Real-time sync and backups

📌 Disclaimer

This project is intended as a learning-focused prototype and frontend foundation.
Security and scalability considerations are intentionally simplified.

📄 License

This project is open for learning and experimentation.