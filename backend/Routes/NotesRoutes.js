const express = require('express')
const db = require('../Config/db')
const router = express.Router()
const jwt = require('jsonwebtoken')

const authMiddleWare = require('../MiddleWare/authMiddleWare')

router.use(authMiddleWare)


const SECRET_KEY = "AadhiPrince";

router.put("/restoreFromTrash/:id", async (req, res) => {
  const userId = req.userId
    db.query(
      "UPDATE notes SET is_deleted = 0 WHERE id = ? AND user_id = ?",
      [req.params.id, userId],
      (err, results) => {
        if (err) {
          return res
            .status(402)
            .json({ success: false, message: "Update Failed " });
        }
        if (results) {
          return res
            .status(200)
            .json({ success: true, message: "Notes Restored Successfully" });
        }
      }
    );
  });

router.delete("/permanentlyDeleteNote/:id", async (req, res) => {
 
    const userId = req.userId;
    db.query(
      "DELETE FROM notes WHERE id = ? AND user_id = ?",
      [req.params.id, userId],
      (err, results) => {
        if (err) {
          return res
            .status(402)
            .json({ success: false, message: "Delete Failed " });
        }
      
        if (results.affectedRows > 0) {
          return res
            .status(200)
            .json({ success: true, message: "Notes Deleted Successfully" });
        }
      }
    );
  });


router.put("/updateNote/:id", async (req, res) => {
  const { title, description } = req.body;
 
    const userId = req.userId;

    db.query(
      "UPDATE notes SET title = ? , description = ? WHERE id = ? AND user_id = ?",
      [title, description, req.params.id, userId],
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        } else {
          const data = {
            id: req.params.id,
            title: title,
            description: description,
          };
          return res.status(200).json({
            success: true,
            message: "Note Updated Successfully",
            data: data,
          });
        }
      }
    );
  });


router.post("/addNote", async (req, res) => {
  const { title, description } = req.body;

    const userId = req.userId;

    db.query(
      "INSERT INTO notes (title , description , user_id ) VALUES ( ? , ? ,? ) ",
      [title, description, userId],
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        } else {
          const insertedNote = {
            id: result.insertId,
            title,
            description,
          };
          return res.status(200).json({
            success: true,
            message: " Note added successfully",
            data: insertedNote,
          });
        }
      }
    );
  });


router.get("/getNotes", (req, res) => {
 
    const userId = req.userId

    db.query(
      "SELECT * FROM notes WHERE user_id = ?  AND is_deleted = 0 AND is_archieved = 0",
      [userId],
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        } else {
          return res.status(200).json({ success: true, data: result });
        }
      }
    );
  });

router.put("/moveToArchive/:id", async (req, res) => {
  const id = req.params.id;
  
    const userId = req.userId;

    db.query(
      "UPDATE notes SET is_archieved = 1 WHERE id = ? AND user_id = ?",
      [id, userId],
      (err, results) => {
        if (err) {
          return res
            .status(402)
            .json({ success: false, message: "Update Failed " });
        }
        if (results) {
          return res
            .status(200)
            .json({ success: true, message: "Notes Archieved Successfully" });
        }
      }
    );
  });

router.put("/unarchiveNote/:id", async (req, res) => {
  const id = req.params.id;
   const userId = req.userId;

    db.query(
      "UPDATE notes SET is_archieved = 0 WHERE id = ? AND user_id = ?",
      [id, userId],
      (err, results) => {
        if (err) {
          return res
            .status(402)
            .json({ success: false, message: "Update Failed " });
        }
        if (results) {
          return res
            .status(200)
            .json({ success: true, message: "Notes Unarchieved Successfully" });
        }
      }
    );
  });
router.get("/getArchivedNotes", async (req, res) => {
 const userId = req.userId;

    db.query(
      "SELECT * FROM notes WHERE user_id = ?  AND is_deleted = 0 AND is_archieved = 1",
      [userId],
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        } else {
          return res.status(200).json({ success: true, data: result });
        }
      }
    );
  });

router.put("/moveToTrash/:id", async (req, res) => {
  const id = req.params.id;
  const authHeaders = req.headers.authorization;
 const userId = req.userId;


    db.query(
      "UPDATE notes SET is_deleted = 1 WHERE id = ? AND user_id = ?",
      [id, userId],
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }
        if (result) {
          return res
            .status(200)
            .json({ success: true, message: "Note moved to trash" });
        }
      }
    );
  });

router.get("/getTrashNotes", async (req, res) => {
   const userId = req.userId;



    db.query(
      "SELECT * FROM notes WHERE user_id = ?  AND is_deleted = 1",
      [userId],
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        } else {
          return res.status(200).json({ success: true, data: result });
        }
      }
    );
  });

module.exports = router