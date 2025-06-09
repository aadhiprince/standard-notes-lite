# 📝 Standard Notes Lite

A full-stack notes application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to securely register, log in, and manage personal notes with full CRUD functionality. The design and functionality are inspired by Standard Notes.

## 🔧 Tech Stack

- MongoDB – Database for storing users and notes  
- Express.js – Backend REST API framework  
- React.js – Frontend UI with functional components  
- Node.js – Backend runtime environment  
- Redux Toolkit – State management  
- Tailwind CSS – Utility-first CSS framework  
- Axios – API communication  
- JWT – Authentication  
- Bcrypt – Password hashing  

## ✨ Features

- Secure user registration and login with password encryption  
- JWT-based authentication and protected API routes  
- Full CRUD operations on notes: create, read, update, delete  
- Notes displayed as responsive, interactive cards  
- Token-based API access control for all note operations  
- Global state management using Redux Toolkit  
- Clean and minimalistic UI with Tailwind CSS  
- Conditional rendering based on authentication status  
- Modular React components for scalability and maintainability  
- Middleware for authentication verification on backend routes  

## 🔐 Authentication Flow

- Users create accounts with encrypted passwords stored securely in MongoDB  
- Upon login, a JWT token is generated and returned to the client  
- Token is sent in headers for all protected note-related API requests  
- Backend middleware verifies tokens to restrict unauthorized access  

## 🧠 Functional Overview

- Notes are linked to individual users using user IDs extracted from JWT tokens  
- Users can add new notes with titles and bodies, update existing notes, or delete them  
- Frontend uses Redux Toolkit for managing user authentication and notes data  
- Axios handles all client-server API requests and responses  
- UI components include login/signup forms, notes listing, modals for creating/updating notes, and user navigation elements  

## 📌 Current Status

- Fully functional locally  
- Not deployed online  
- Codebase maintained on GitHub only  

## 🙌 Credits

Inspired by Standard Notes. Built by Aadhithyan, 2025.

