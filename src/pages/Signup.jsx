import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../config/api";
import "./Signup.css";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  async function handleSignup(event) {

    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {

      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );


      const data = await response.json();


      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }


      // Registration successful
      setMessage("Account created successfully!");

      // Send user to login page
      setTimeout(() => {
        navigate("/login");
      }, 1000);


    } catch (error) {

      console.error("Signup error:", error);

      setMessage("Unable to connect to server");

    } finally {

      setLoading(false);

    }

  }


  return (

    <div className="signup-page">

      <div className="signup-card">

        <div className="signup-heading">

          <span>GET STARTED</span>

          <h1>Create Account</h1>

          <p>
            Join DSA Visualizer and start tracking
            your learning progress.
          </p>

        </div>


        <form onSubmit={handleSignup}>

          <div className="signup-form-group">

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />

          </div>


          <div className="signup-form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

          </div>


          <div className="signup-form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>


          {message && (
            <div className="signup-message">
              {message}
            </div>
          )}


          <button
            className="signup-button"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>


        <p className="login-text">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Signup;