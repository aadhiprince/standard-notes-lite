import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import '../App.css'
function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [ error , setError ] = useState('')
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      localStorage.setItem("token", result.token);
      console.log(result.message || "Login Successfull");
      if (result.success) {
        Navigate("/dashboard");
      }
      else{
        setError(result.message)
        console.log( "Login Failed");
        setForm({ email: "", password: "" });
      }
    } catch (err) {
      console.log(err.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <h3 className="login-heading">Login Form</h3>
      <form onSubmit={handleSubmit} className="login-form">
        
        <label >Email</label>
        <input 
          type="email"
          name="email"
          placeholder="Enter your name..."
          required
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="text"
          name="password"
          placeholder="Enter your password..."
          required
          onChange={handleChange}
        />
        {error && <p className="login-error">{error}</p>}
        <button className="login-btn" type="submit">Login</button>
        <p className="login-para">Not a user ? <Link className='link-tag' to="/Register">Register</Link></p>
      </form>
    </div>
  );
}

export default Login;
