import { FiHome, FiArchive, FiTrash2, FiLogOut, FiSun, FiMoon } from "react-icons/fi";

function Navbar({ name, handlelogout, toggleDarkMode, darkMode, handleViewChange }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h3>Hello, {name}</h3>
        <button onClick={() => handleViewChange("active")} className="icon-button">
          Home
        </button>
        <button onClick={() => handleViewChange("archived")} className="icon-button">
          Archive
        </button>
        <button onClick={() => handleViewChange("trash")} className="icon-button">
          Trash
        </button>
      </div>
      <div className="nav-right">
        <button onClick={toggleDarkMode} className="icon-button">
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
        <button onClick={handlelogout} className="icon-button">
          <FiLogOut />
        </button>
      </div>
    </nav>
  );
}
export default Navbar;