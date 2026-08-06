# QR Menu Management System

A full-stack QR-based restaurant menu management system that enables restaurant owners to manage restaurants, menus, and menu items through an authenticated dashboard, while customers can view live menus instantly by scanning a QR code without any app installation or login.

## Live Demo

- **Frontend (Vercel):** https://qr-menu-management-project.vercel.app
- **Backend API (Render):** https://qr-menu-management-project.onrender.com/api/v1

> **Note:** The backend is deployed on Render's free tier. It may take up to 50 seconds to spin up on the first request after being idle. Please allow a moment for the initial response.

## Features

### Restaurant Owner (Authenticated)

- Secure registration and login with JWT authentication
- Create and manage multiple restaurants
- Generate unique QR codes for each restaurant
- Create menus (e.g., Breakfast, Lunch, Dinner)
- Add, update, and delete menu items
- Toggle item availability (Available / Unavailable)
- Publish and unpublish menus
- Download restaurant QR codes as PDF
- Dark and light theme support

### Customer (Public)

- Scan QR code to view restaurant menu instantly
- Browse menus and menu items without authentication
- View only published menus and available items
- Responsive mobile-first design

## Technology Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React 19 | Component-based UI development |
| Vite | Build tool and development server |
| Tailwind CSS 4 | Utility-first styling with dark mode support |
| React Router 7 | Client-side routing |
| Axios | HTTP client for API communication |
| Framer Motion | Animation library |
| Lucide React | Icon library |
| React Hook Form | Form validation |
| jsPDF | QR code PDF generation |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| MongoDB | NoSQL database |
| Mongoose | Object Data Modeling (ODM) |
| JWT | Stateless authentication |
| bcrypt | Password hashing |
| Express Validator | Request validation |
| QRCode | QR code generation |
| Nodemailer | Email verification and password reset |
| Winston | Logging |

### Deployment

| Service | Purpose |
|---------|---------|
| Vercel | Frontend hosting |
| Render | Backend API hosting |
| MongoDB Atlas | Database hosting |

## Project Structure

```text
qr-menu-management/
├── backend/                 # Express.js backend API
│   ├── src/
│   │   ├── config/         # Environment and database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middlewares/    # Auth, validation, error handling
│   │   ├── models/         # Mongoose schemas
│   │   ├── routers/        # API route definitions
│   │   ├── utils/          # Helper utilities
│   │   └── validators/     # Request validation rules
│   └── package.json
│
└── frontend/               # React frontend application
    ├── src/
    │   ├── api/            # API service functions
    │   ├── components/     # Reusable UI components
    │   ├── context/        # React context providers
    │   ├── hooks/          # Custom React hooks
    │   ├── pages/          # Page components
    │   ├── routes/         # Route definitions
    │   └── utils/          # Utility functions
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or pnpm

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update the environment variables in `.env` with your MongoDB connection string and secrets.

5. Start the development server:

```bash
npm run dev
```

The backend will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update the `VITE_API_URL` to point to your backend:

```bash
VITE_API_URL=http://localhost:8000/api/v1
```

5. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## API Endpoints

### Authentication

```text
POST   /api/v1/users/register
POST   /api/v1/users/login
POST   /api/v1/users/logout
GET    /api/v1/users/me
GET    /api/v1/users/verify-email/:token
POST   /api/v1/users/resend-verification
POST   /api/v1/users/forgot-password
POST   /api/v1/users/reset-password/:token
POST   /api/v1/users/refresh-token
PATCH  /api/v1/users/change-password
```

### Restaurants

```text
POST   /api/v1/restaurants
GET    /api/v1/restaurants
GET    /api/v1/restaurants/:restaurantId
PATCH  /api/v1/restaurants/:restaurantId
PATCH  /api/v1/restaurants/:restaurantId/activate
PATCH  /api/v1/restaurants/:restaurantId/delete
GET    /api/v1/restaurants/:restaurantId/qr
```

### Menus

```text
POST   /api/v1/menus/:restaurantId
GET    /api/v1/menus/:restaurantId
PATCH  /api/v1/menus/:menuId/activate
PATCH  /api/v1/menus/:menuId/deactivate
PATCH  /api/v1/menus/:menuId/publish
PATCH  /api/v1/menus/:menuId/unpublish
```

### Menu Items

```text
POST   /api/v1/menu-items/menu/:menuId
GET    /api/v1/menu-items/menu/:menuId
PATCH  /api/v1/menu-items/:itemId
PATCH  /api/v1/menu-items/:itemId/toggle
```

### Public

```text
GET    /api/v1/public/menu/:restaurantId
GET    /api/v1/health
```

## Security

- JWT-based stateless authentication
- HTTP-only cookies to prevent XSS attacks
- Role-based access control (RBAC)
- Ownership verification middleware
- Public APIs are read-only and strictly filtered
- Password hashing with bcrypt
- Soft deletes to prevent data loss

## Theme System

The application features a unified black and white theme with dark and light mode support:

- Theme preference is persisted in localStorage
- System preference detection on first visit
- No flash of incorrect theme on page load
- Theme toggle available on all pages
- Consistent design language across all components

## Deployment

### Frontend (Vercel)

1. Push the repository to GitHub
2. Import the project in Vercel
3. Set the root directory to `frontend`
4. Add the `VITE_API_URL` environment variable
5. Deploy

### Backend (Render)

1. Create a new Web Service in Render
2. Connect the GitHub repository
3. Set the root directory to `backend`
4. Add all environment variables from `.env.example`
5. Set the start command to `npm start`
6. Deploy

> **Note:** On Render's free tier, the backend may take up to 50 seconds to respond on the first request after being idle.

## License

ISC License

## Author

Anil Kumar
