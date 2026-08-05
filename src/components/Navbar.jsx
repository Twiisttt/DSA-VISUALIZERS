function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        <span className="logo-icon">&lt;/&gt;</span>
        <span>DSA Visualizer</span>
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="#algorithms">Explore</a>
        <a href="#features">Features</a>
      </div>

      <button className="profile-btn" aria-label="Open profile">
        <div className="avatar">
          👤
        </div>

        <div className="profile-text">
          <span>My Profile</span>
          <small>View progress</small>
        </div>

        <span className="profile-arrow">⌄</span>
      </button>

    </nav>
  );
}

export default Navbar;