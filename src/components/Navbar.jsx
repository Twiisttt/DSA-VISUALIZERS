import { Link } from "react-router-dom";

function Navbar() {

  // Check whether JWT exists
  const token = localStorage.getItem("token");

  const isLoggedIn = !!token;

  return (
    <nav className="navbar">

      {/* =========================
          LOGO
      ========================== */}

      <Link to="/" className="logo">

        <span className="logo-icon">
          &lt;/&gt;
        </span>

        <span>
          DSA Visualizer
        </span>

      </Link>


      {/* =========================
          NAVIGATION
      ========================== */}

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


      {/* =========================
          AUTH SECTION
      ========================== */}

      <div className="nav-auth">

        {isLoggedIn ? (

          // USER IS LOGGED IN

          <Link
            to="/profile"
            className="profile-btn"
            aria-label="Open profile"
          >

            <div className="avatar">
              👤
            </div>


            <div className="profile-text">

              <span>
                My Profile
              </span>

              <small>
                View progress
              </small>

            </div>


            <span className="profile-arrow">
              ›
            </span>

          </Link>

        ) : (

          // USER IS NOT LOGGED IN

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