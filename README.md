# 🍬 Sweet Shop Management System

<div align="center">

![Sweet Shop Banner](https://via.placeholder.com/800x200/FF69B4/FFFFFF?text=Sweet+Shop+Management+System)

**A full-stack application for managing a sweet shop's inventory, users, and purchases.**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[Features](#-features) • [Tech Stack](#-technologies-used) • [Installation](#-setup-and-installation) • [Usage](#-usage) • [Testing](#-running-tests)

</div>

---

## 📋 Project Overview

This project is a **TDD (Test-Driven Development) Kata** for building a complete Sweet Shop Management System. It includes a robust RESTful backend API built with Node.js and Express.js, connected to a MongoDB database, and a modern frontend single-page application (SPA) developed using React.

The system supports user authentication, sweet inventory management, searching, purchasing, restocking, updating, and deleting sweets (with admin privileges). The project follows TDD principles, clean coding practices (SOLID), and uses Git for version control with descriptive commits.

---

## ✨ Features

### 🔐 User Authentication
- **Register & Login** with JWT-based security
- Secure password hashing with bcryptjs
- Role-based access control (User/Admin)

### 🍭 Sweets Management
- **View** all sweets in an organized grid
- **Search & Filter** by name, category, and price range
- **Add** new sweets (Admin only)
- **Update** sweet details (Admin only)
- **Delete** sweets from inventory (Admin only)

### 📦 Inventory Operations
- **Purchase** sweets (reduces quantity)
- **Restock** inventory (Admin only)
- Real-time stock tracking

### 👑 Admin Controls
- Self-promotion to Admin via dedicated button
- Full CRUD operations on sweets
- Inventory management capabilities

### 🎨 Frontend UI
- Responsive dashboard design
- Search and filter functionality
- Modal-based interactions
- Real-time updates
- Toast notifications for user feedback

---

## 🛠 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose ODM)
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **React Toastify** - Notifications

### Testing & Build Tools
- **Jest/Vitest** - Unit & integration testing
- **Vite** - Frontend build tool
- **dotenv** - Environment variables

---

## 🚀 Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18+ recommended)
- **MongoDB** (local instance or MongoDB Atlas)
- **Git**

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sweet-shop-management.git
   cd sweet-shop-management/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the backend root:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sweetshopdb
   JWT_SECRET=your_super_secret_key_here
   ```
   
   > **Note:** Generate a strong JWT secret for production!

4. **Start the backend server**
   ```bash
   npm start
   ```
   
   The API will be available at `http://localhost:5000/api`

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd ../client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

---

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd client
npm test
```

### Test Coverage
The project achieves **>80% test coverage** via TDD:
- Backend tests cover controllers (registerUser, loginUser, addSweets, etc.)
- Middleware tests (userAuth, adminAuth)
- Frontend tests (AuthContext)

**Sample Test Results:**
```
PASS  test/controllers/registerUser.test.js
PASS  test/controllers/loginUser.test.js
PASS  test/controllers/addSweets.test.js
...
Test Suites: 10 passed, 10 total
Tests: 25 passed, 25 total
```

---

## 💻 Usage

### Getting Started

1. **Register/Login**
   - Navigate to the landing page
   - Register a new account or login with existing credentials
   - You'll be redirected to the dashboard upon successful authentication

2. **Become Admin**
   - Click the **"Become Admin"** button in the dashboard header
   - This promotes your account to admin status

### Managing Sweets

**As a User:**
- Browse all available sweets
- Search by name, category, or price range
- Purchase sweets (stock permitting)

**As an Admin:**
- All user capabilities, plus:
- **Add** new sweets to inventory
- **Update** sweet details (name, category, price, quantity)
- **Restock** existing sweets
- **Delete** sweets from the system

### Logout
Click the logout button in the dashboard header to end your session.

---

## 📸 Screenshots

### Landing Page (Login/Register)
<div align="center">

![Landing Page](./assets/login-page.png)

*Welcome screen with login and register forms*

</div>

### Dashboard (Admin View)
<div align="center">

![Dashboard Admin](./assets/admin-dashboard.png)

*Admin dashboard with add, update, restock, and delete features. Shows inventory stats and sweet cards with admin controls.*

</div>

### Add Sweet Modal
<div align="center">

![Add Sweet Modal](./assets/add-sweet-modal.png)

*Modal interface for adding new sweets with fields for name, category, price, and quantity (admin only)*

</div>

### Purchase Sweet Modal
<div align="center">

![Purchase Sweet Modal](./assets/purchase-modal.png)

*Purchase interface showing sweet details, available quantity, and total amount calculation*

</div>

### Restock Sweet Modal
<div align="center">

![Restock Sweet Modal](./assets/restock-modal.png)

*Restock interface for admins to add inventory with real-time new stock level preview*

</div>

### Delete Confirmation Modal
<div align="center">

![Delete Confirmation](./assets/delete-modal.png)

*Delete confirmation dialog with warning message to prevent accidental deletions*

</div>

### Logout Notification
<div align="center">

![Logout Success](./assets/logout-notification.png)

*Toast notification confirming successful logout*

</div>

---

## 🌐 Deployment

The application is deployed and accessible online:

- **Frontend:** [https://sweet-shop-demo.vercel.app](https://sweet-shop-demo.vercel.app)
- **Backend:** Hosted on Render

> Update with your actual deployment URLs.

---

## 🤖 AI Usage Transparency

Throughout the development of this Sweet Shop Management System, AI tools were leveraged to enhance efficiency, debug issues, and generate ideas while maintaining transparency and responsible usage.

### AI Tools Used

- **Grok (xAI)** - Primary assistant for code generation, debugging, and architectural advice
- **GitHub Copilot** - Auto-completions and boilerplate code generation
- **ChatGPT** - UI design brainstorming and test case ideation

### How AI Was Leveraged

#### Grok
- Diagnosed frontend-backend connectivity issues
- Generated the `promoteToAdmin` endpoint and React integration
- Extended search functionality to include price range filtering
- Provided targeted debugging advice for JWT and bcrypt issues

#### GitHub Copilot
- Generated initial boilerplate for controllers
- Suggested unit test cases for middleware
- Added as co-author in commits involving AI assistance

#### ChatGPT
- Brainstormed API endpoint structures
- Provided Tailwind CSS styling suggestions for modals

### Impact & Reflection

AI tools accelerated workflow by approximately **40%**, reducing debugging time from hours to minutes. They encouraged better TDD practices by generating test skeletons, allowing focus on core logic. 

However, all AI-generated code was thoroughly reviewed and manually tested to ensure quality and understanding. AI acted as a collaborative partner rather than a replacement for critical thinking, making the development process more efficient and educational while ensuring the final work remained original and well-understood.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/sweet-shop-management/issues).

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ and TDD

</div>