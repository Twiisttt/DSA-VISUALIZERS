import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  // Re-check token whenever route changes
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  return (
    <nav className="navbar">

      {/* LOGO */}
      <Link to="/" className="logo">
        <span className="logo-icon">
          &lt;/&gt;
        </span>

        <span>DSA Visualizer</span>
      </Link>


      {/* NAVIGATION */}
      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <a href="/#algorithms">
          Explore
        </a>

        <a href="/#features">
          Features
        </a>

      </div>


      {/* AUTH SECTION */}
      <div className="nav-auth">

        {isLoggedIn ? (

          <Link
            to="/profile"
            className="profile-btn"
            aria-label="Open profile"
          >

            <div className="avatar">
              👤
            </div>

            <div className="profile-text">
              <span>My Profile</span>
              <small>View progress</small>
            </div>

            <span className="profile-arrow">
              ›
            </span>

          </Link>

        ) : (

          <div className="auth-buttons">

            <Link
              to="/login"
              className="nav-login-btn"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="nav-signup-btn"
            >
              Sign Up
            </Link>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;