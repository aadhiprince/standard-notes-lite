# React Notes App
# Introduction
A web application with **CRUD** (Create, Retrieve, Update, Delete) functionality built using **MERN** stack (MongoDB, Express, React, Node.js) that allows the user to view, create, update and delete notes in the form of visual cards.
# Tech stacks used
 - **[MongoDB](https://www.mongodb.com/)** - For database functionality
 - **[Express](https://expressjs.com/)** - For handling server side (backend) functions
 - **[React](https://react.dev/)** - For frontend and client side functions
 - **[Node.js](https://nodejs.org/en)** - For backend functions
# Approach
## Backend
### General
 - Express routers are used to handle user and note functions.
 - [Mongoose](https://mongoosejs.com/) is used to handle MongoDB connection.

### Authentication
 - HTTP **POST** requests are used for both sign up and log in.
 - Signing up requires creating a username, entering email and password.
 - Uses [bcrypt](https://www.npmjs.com/package/bcrypt) to encrypt passwords given by users before storing them in database.
 - Before sign up, the API checks DB to ensure email does not already exist.
 - For logging in, DB is checked to make sure user exists. 
 - Then a [JWT](https://jwt.io/) token is created after signing the payload (the user ID in the database) with a secret key and given an expiration time of 1 day.
 - After successful login, this token is returned.
 - For every operation involving notes, this token is sent in the appropriate HTTP request's header.
 - If token expires, user is requested to login again.
### Database Models/Schema
 - Two models - user and note
 - User model contains username, email, and password (encrypted), also auto-generated user ID.
 - Note model contains title, body and user ID of the user who created it, also auto-generated note ID.
### Creating Notes
 - An HTTP **POST** request is sent with the aforementioned **token** in its header.
 - Notes are in JSON form containing title and body.
 - The user for which note is created is identified from token.
 - Uses `save` method from Mongoose.
### Retrieving Notes
 - An HTTP **GET** request is sent with the token in its header.
 - The user ID is identified from token and the DB is searched for notes having user ID of current user.
 - Uses `find` method from Mongoose.
 - The notes are then sent back in JSON form.
### Updating Notes
 - An HTTP **PATCH** request is sent to the API whose header contains the token as well as the ID of the required note.
 - The new title and body is sent in JSON form.
 - It uses `findByIdAndUpdate` method from Mongoose.
### Deleting Notes
 - An HTTP **DELETE** request is sent to the API with the token and required note ID in its header.
 - It uses `findByIdAndDelete` method from Mongoose.

