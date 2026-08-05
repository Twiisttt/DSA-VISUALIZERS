import { Link } from "react-router-dom";

function AlgorithmSection() {
  return (
    <section id="algorithms" className="algorithms">

      <div className="section-heading">
        <span>EXPLORE</span>

        <h2>Learn Algorithms Visually</h2>

        <p>
          Choose a topic and understand how data structures
          and algorithms work step by step.
        </p>
      </div>

      <div className="algorithm-grid">

        {/* STACK */}
        <div className="algorithm-card">
          <div className="card-icon">📚</div>

          <h3>Stack</h3>

          <p>
            Understand LIFO operations including push,
            pop and peek visually.
          </p>

          <Link to="/stack">
            <button>Explore Stack →</button>
          </Link>
        </div>


        {/* QUEUE */}
        <div className="algorithm-card">
          <div className="card-icon">📥</div>

          <h3>Queue</h3>

          <p>
            Visualize FIFO operations including enqueue
            and dequeue.
          </p>

          <button>Explore Queue →</button>
        </div>


        {/* SORTING */}
        <div className="algorithm-card">
          <div className="card-icon">📊</div>

          <h3>Sorting</h3>

          <p>
            Watch sorting algorithms compare and move
            elements step by step.
          </p>

          <button>Explore Sorting →</button>
        </div>


        {/* SEARCHING */}
        <div className="algorithm-card">
          <div className="card-icon">🔍</div>

          <h3>Searching</h3>

          <p>
            Understand how searching algorithms find
            elements efficiently.
          </p>

          <button>Explore Searching →</button>
        </div>

      </div>

    </section>
  );
}

export default AlgorithmSection;