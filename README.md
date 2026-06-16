# 🤖 AI-Powered Inventory Management System

A full-stack AI-based Inventory Management System built using the MERN Stack. This application helps businesses manage products, monitor stock levels, analyze inventory data, and get AI-powered assistance using Google Gemini AI.
## 🚀 Features

### 📦 Product Management
* Add new products
* View all products
* Update product details
* Delete products
* Search products by name
* Filter products by category
* Pagination for product listing

### 📊 Dashboard Analytics

* Total number of products
* Total categories
* Low stock alerts
* Total inventory value
* Recent products overview

### 🧠 AI Features

#### AI Stock Prediction

* Predicts stock conditions based on current quantity
* Identifies low-stock products
* Provides restocking recommendations

#### Gemini AI Assistant

* Integrated Google Gemini AI chatbot
* Answers inventory-related questions
* Provides smart assistance

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB
* Mongoose

### AI Integration

* Google Gemini AI API

### Development Tools

* Git
* GitHub
* VS Code
* Postman

---

## 📂 Project Structure

AI-Inventory-Management-System

├── client/          # React Frontend
├── server/          # Node.js Backend
├── package.json
└── README.md

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/AI-Inventory-Management-System.git
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the server folder:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

### 5. Run the backend server

```bash
npm run dev
```

### 6. Run the frontend

```bash
cd client
npm run dev
```

---

## 📌 API Endpoints

### Product APIs

* GET `/products` - Get all products
* POST `/products` - Add product
* PUT `/products/:id` - Update product
* DELETE `/products/:id` - Delete product
* GET `/products/search` - Search products
* GET `/products/category/:category` - Filter by category
* GET `/products/low-stock` - Low stock products

### AI APIs

* GET `/products/ai-stock` - AI stock prediction
* POST `/chat` - Gemini AI chatbot

---

## 🔮 Future Improvements

* User authentication
* Role-based access
* Sales and purchase management
* Advanced AI stock forecasting
* Email notifications for low stock
* Charts and reports

---

## 👩‍💻 Author

**Aastha Jaiswal**

BCA Student | Full Stack MERN Developer

---

⭐ If you like this project, don't forget to star the repository!
