import AddNote from "../pages/AddNote"
import '../pages/Dashboard.css';

function NoteFormModal({ setShowForm  , editingNote , handleAddNote , showForm}) {
  return (
    <div>
     
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowForm(false)}>
              ×
            </button>
            <h3>{editingNote ? "Update Note" : "Add Note"}</h3>
            <AddNote onAdd={handleAddNote} existingNote={editingNote} />
          </div>
        </div>
      )}
    </div>
  );
}
export default NoteFormModal;
