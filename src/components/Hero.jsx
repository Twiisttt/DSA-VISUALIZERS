function Hero() {
  return (
    <main className="hero">

      <div className="hero-badge">
        Interactive DSA Learning Platform
      </div>

      <h1>
        Understand DSA.
        <span> Visualize Every Step.</span>
      </h1>

      <p>
        Learn data structures and algorithms through interactive
        visualizations, practice questions, and progress tracking.
      </p>

      <div className="hero-buttons">
        <button className="primary-btn">
          Start Learning
        </button>

        <a href="#algorithms" className="secondary-btn">
            Explore Algorithms
        </a>
      </div>

    </main>
  );
}

export default Hero;