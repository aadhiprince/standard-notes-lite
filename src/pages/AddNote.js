import { useState, useEffect } from "react";
import "./Dashboard.css";

function AddNote({ onAdd, existingNote }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setDescription(existingNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [existingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "" || description === "") {
      return console.log("Please fill all the fields");
    }
    const token = localStorage.getItem("token");

    try {
      if (existingNote) {
        const response = await fetch(
          `http://localhost:5000/updateNote/${existingNote.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description }),
          }
        );
        const result = await response.json();

        console.log("UpdateNote response:", result); // Add this line

        if (result.success) {
          onAdd(result.data);
          setTitle("");
          setDescription("");
          setError("");
        } else {
          console.log("Failed to update note");
        }
      } else {
        const response = await fetch("http://localhost:5000/addNote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, description }),
        });
        const result = await response.json();

        console.log("AddNote response:", result); // Add this line

        if (result.success) {
          onAdd(result.data);
          setTitle("");
          setDescription("");
          setError("");
        } else {
          console.log("Failed to add note");
        }
      }
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <form className="add-note-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button className='modal-button' type="submit">
          {existingNote ? "Update Note" : "Add Note"}
        </button>
      </form>
    </div>
  );
}
export default AddNote;
