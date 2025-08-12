import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdArchive,
  MdUnarchive,
  MdRestoreFromTrash,
  MdDeleteForever,
} from "react-icons/md";
import "../pages/Dashboard.css";

function NotesList({
  showForm,
  notes,
  viewTrash,
  viewArchived,
  handleArchive,
  handleDelete,
  handlePermanentDelete,
  handleRestore,
  handleUpdate,
}) {
  return (
    <div>
      <div className={`notes-section ${showForm ? "blurred" : ""}`}>
        {notes.length === 0 ? (
          <p>No Notes Found</p>
        ) : (
          <ul>
            {notes &&
              notes.map((note) => (
                <li key={note.id} className="note-card">
                  <h4>{note.title}</h4>
                  <p>{note.description}</p>
                  <>
                    {viewTrash ? (
                      <>
                        <button
                          className="icon-button"
                          onClick={() => handleRestore(note.id)}
                        >
                          <MdRestoreFromTrash />
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => handlePermanentDelete(note.id)}
                        >
                          <MdDeleteForever />
                        </button>
                      </>
                    ) : viewArchived ? (
                      <>
                        <button
                          className="icon-button"
                          onClick={() => handleArchive(note.id, true)}
                        >
                          <MdUnarchive />
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => handleUpdate(note)}
                        >
                          {" "}
                          <MdEdit />
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => handleDelete(note.id)}
                        >
                          <MdDelete />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="icon-button"
                          onClick={() => handleArchive(note.id)}
                        >
                          <MdArchive />
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => handleUpdate(note)}
                        >
                          <MdEdit />
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => handleDelete(note.id)}
                        >
                          <MdDelete />
                        </button>
                      </>
                    )}
                  </>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default NotesList;
