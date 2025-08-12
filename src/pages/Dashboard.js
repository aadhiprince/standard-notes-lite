import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

import Navbar from "./Navbar";
import NotesList from '../components/NotesList'
import NoteFormModal from "../components/NoteFormModal";
import "./Dashboard.css";

function Dashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewArchived, setViewArchived] = useState(false);
  const [viewTrash, setViewTrash] = useState(false);

  const Navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    if (!token) {
      Navigate("/");
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      // Capitalize the first word

      const newName = payload.name.split(" ").map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
      setName(newName);
      setEmail(payload.email);
    } catch (err) {
      console.log("Invalid Token");
    }
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/getNotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (result.success) {
        setNotes(result.data);
      }
      console.log("Fetched notes:", result.data); // Add this line
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTrashNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/getTrashNotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setNotes(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch trash notes:", err);
    }
  };

  const fetchArchivedNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/getArchivedNotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setNotes(result.data);
      } else {
        console.error("Failed to fetch archived notes:", result.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleViewChange = async (view) => {
    setViewArchived(false);
    setViewTrash(false);

    if (view === "archived") {
      setViewArchived(true);
      await fetchArchivedNotes();
    } else if (view === "trash") {
      setViewTrash(true);
      await fetchTrashNotes();
    } else {
      await fetchNotes(); // default/home
    }
  };

  const handleRestore = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/restoreFromTrash/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (result.success) {
        setNotes((prev) => prev.filter((note) => note.id !== id));
        console.log("Note restored from trash.");
      }
    } catch (err) {
      console.error("Restore failed", err);
    }
  };

  const handlePermanentDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/permanentlyDeleteNote/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (result.success) {
        setNotes((prev) => prev.filter((note) => note.id !== id));
        console.log("Note permanently deleted.");
      }
    } catch (err) {
      console.error("Permanent delete failed", err);
    }
  };

  const handleAddNote = (newNotes) => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((note) => (note.id === editingNote.id ? newNotes : note))
      );
      setEditingNote(null);
    } else {
      setNotes((prev) => [newNotes, ...prev]);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/moveToTrash/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setNotes((prev) => prev.filter((note) => note.id !== id));
        console.log("Notes Deleted Successfully");
      }
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  const handleUpdate = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleArchive = async (id, unarchive = false) => {
    const url = unarchive
      ? `http://localhost:5000/unarchiveNote/${id}`
      : `http://localhost:5000/moveToArchive/${id}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setNotes((prev) => prev.filter((note) => note.id !== id));
        console.log(
          unarchive ? "Unarchived successfully" : "Archived successfully"
        );
      }
    } catch (err) {
      console.error(unarchive ? "Unarchive failed" : "Archive failed", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  return (
    <div className="dashboard-container">
      <Navbar
        name={name}
        handlelogout={handleLogout}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        darkMode={darkMode}
        handleViewChange={handleViewChange}
      />
      <div>
        <NotesList notes={notes}
         showForm={showForm}
         handleArchive={handleArchive}
         handleDelete={handleDelete}
         handleRestore={handleRestore}
         handlePermanentDelete={handlePermanentDelete}
         handleUpdate={handleUpdate}
         viewArchived={viewArchived}
         viewTrash={viewTrash}
         />
      </div>
       <button
        className="floating-button"
        onClick={() => {
          setShowForm(true);
          setEditingNote(null);
        }}
      >
        +
      </button>
      <NoteFormModal setShowForm={setShowForm}
      editingNote={editingNote} setEditingNote={setEditingNote} handleAddNote={handleAddNote} showForm={showForm} />
    </div>
  );
}
export default Dashboard;
