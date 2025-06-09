# Standard Notes Lite 📝

A secure, minimalistic notes application built using the MERN stack, inspired by Standard Notes. It provides user authentication and full CRUD functionality for managing personal notes with a clean and responsive UI.

## 🚀 Tech Stack

- **Frontend**: React.js, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT, bcrypt
- **Others**: Axios, Quill.js (rich text editor)

## ✅ Features

- User registration and login with encrypted password storage
- JWT-based protected routes for note operations
- Add, edit, delete, and view personal notes
- Notes displayed as responsive cards
- Rich text editing support using Quill
- Search and filter notes
- Timestamps for creation and updates
- Notes tagged and categorized
- Responsive UI for mobile and desktop
- Error handling and loading states using Redux

## 📦 Installation & Usage

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/standard-notes-lite.git
   cd standard-notes-lite

2 .**Create environment variables**

    ```bash
    
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret


3 .Install dependencies


```

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
Run the app
npm run dev



4  .Access the app
```


    Frontend: http://localhost:3000

    Backend API: http://localhost:5000/

📝 Notes
This project is not deployed. Code is available only on GitHub.

Frontend is bootstrapped using Vite.

All notes are user-specific and securely stored in MongoDB.


