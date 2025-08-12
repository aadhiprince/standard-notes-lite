const express = require('express')
const router = express.Router()
const db = require('../Config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const SECRET_KEY = "AadhiPrince";

router.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Email Already regsitered" });
    }
    if (results.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ success: false, message: "Registration Failed" });
        } else {
          return res
            .status(200)
            .json({ success: true, message: "Registration Successfull" });
        }
      }
    );
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    if (results) {
      if (results.length == 0) {
        return res
          .status(400)
          .json({ success: false, message: "No User Exists" });
      }
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err || !isMatch) {
          return res
            .status(401)
            .json({ success: false, message: "Invalid Credentials" });
        } else {
          const token = jwt.sign(
            {
              id: results[0].id,
              email: results[0].email,
              name: results[0].name,
            },
            SECRET_KEY,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            success: true,
            message: "User Login Successfull",
            token: token,
          });
        }
      });
    }
  });
});
module.exports = router;
