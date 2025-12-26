# 🍽️ QR Menu Management System

A full-stack **QR-based restaurant menu management system** that allows restaurant owners to manage menus and menu items, and customers to view menus instantly by scanning a QR code — **no app installation required**.

---

## 🔗 Live Demo

- **Frontend (Vercel)**  
  👉 https://qr-menu-management-project.vercel.app

- **Backend API (Render)**  
  👉 https://qr-menu-management-project.onrender.com/api/v1

> 📌 Note: Backend APIs require authentication for owner routes.

---

## 🚀 Features

### 👨‍🍳 Restaurant Owner (Authenticated)
- Register & login securely
- Create and manage restaurants
- Generate unique **QR code** for each restaurant
- Create menus (e.g., Breakfast, Lunch, Dinner)
- Add, update, delete menu items
- Toggle item availability (Available / Unavailable)
- Secure access using JWT authentication

### 📱 Customer (Public)
- Scan QR code
- View restaurant menu instantly
- Browse menus and menu items
- No login required

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Deployment
- Frontend: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

## 🧩 System Architecture

```text
Customer (QR Scan)
        ↓
Frontend (/menu/:restaurantId)
        ↓
Public API
        ↓
MongoDB

Owner Dashboard (Protected)
        ↓
JWT Auth Middleware
        ↓
Private APIs
        ↓
MongoDB