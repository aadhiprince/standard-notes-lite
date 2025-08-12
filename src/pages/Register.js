import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Regsiter() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const [error, setError] = useState("");

  const Navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      console.log(result.message || "Registration Successfull");

      if (result.success) {
        Navigate("/");
      } else {
        setError(result.message);

        console.log("Registration Failed");

        setForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      console.log(err.message || "Registration Failed");
    }
  };
  return (
    <div className="login-container">
      <h3 className="register-heading">Regsiter Form</h3>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Name</label>
        <input
          name="name"
          type="text"
          placeholder="Enter your name..."
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email..."
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          name="password"
          type="text"
          placeholder="Enter your password..."
          onChange={handleChange}
          required
        />
        {error && <p className="register-error">{error}</p>}

        <button className='register-btn' type="submit">Submit</button>
        <p className="register-para">
          Already have an account? <Link className="link-tag" to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}
export default Regsiter;
