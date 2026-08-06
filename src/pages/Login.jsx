import { useState } from "react";
import API_URL from "../config/api";
import {
  Link,
  useNavigate
} from "react-router-dom";
import "./Login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  async function handleLogin(event) {

    event.preventDefault();

    setMessage("");
    setLoading(true);


    try {

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );


      const data = await response.json();


      if (!response.ok) {

        setMessage(data.message);

        setLoading(false);

        return;
      }


      // Save JWT
      localStorage.setItem("token", data.token);

      navigate("/profile");


    } catch (error) {

      console.error("Login error:", error);

      setMessage("Unable to connect to server");

    } finally {

      setLoading(false);

    }

  }


  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-heading">

          <span>WELCOME BACK</span>

          <h1>Login</h1>

          <p>
            Continue learning data structures and
            track your progress.
          </p>

        </div>


        <form onSubmit={handleLogin}>

          <div className="form-group">

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


          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>


          {message && (
            <div className="login-message">
              {message}
            </div>
          )}


          <button
            className="login-button"
            type="submit"
            disabled={loading}
          >

            {loading ? "Logging in..." : "Login"}

          </button>

        </form>


        <p className="signup-text">

          Don't have an account?{" "}

          <Link to="/signup">
            Create account
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;