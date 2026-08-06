import { useEffect, useState } from "react";
import API_URL from "../config/api";
import "./PracticeQuestions.css";

function PracticeQuestions({
  title,
  topic,
  problems
}) {

  const [solvedProblems, setSolvedProblems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // ==========================================
  // LOAD USER PROGRESS
  // ==========================================

  useEffect(() => {

    async function loadProgress() {

      const token =
        localStorage.getItem("token");


      // Not logged in
      if (!token) {
        setLoading(false);
        return;
      }


      try {

        const response = await fetch(
          `${API_URL}/api/progress`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );


        const data =
          await response.json();


        if (!response.ok) {
          return;
        }


        setSolvedProblems(
          data.progress[topic]
            ?.solvedProblems || []
        );


      } catch (error) {

        console.error(
          "Progress loading error:",
          error
        );

      } finally {

        setLoading(false);

      }

    }


    loadProgress();

  }, [topic]);


  // ==========================================
  // TOGGLE PROBLEM
  // ==========================================

  async function toggleProblem(problemId) {

    const token =
      localStorage.getItem("token");


    if (!token) {
      alert(
        "Please login to track your progress."
      );

      return;
    }


    const isSolved =
      solvedProblems.includes(problemId);


    const endpoint = isSolved
      ? "unsolve"
      : "solve";


    try {

      const response = await fetch(
        `http://localhost:5000/api/progress/${endpoint}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`
          },

          body: JSON.stringify({
            topic,
            problemId
          })
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        console.error(
          data.message
        );

        return;
      }


      setSolvedProblems(
        data.progress[topic]
          .solvedProblems
      );


    } catch (error) {

      console.error(
        "Progress update error:",
        error
      );

    }

  }


  // ==========================================
  // PROGRESS CALCULATION
  // ==========================================

  const solvedCount =
    solvedProblems.length;


  const percentage =
    problems.length === 0
      ? 0
      : Math.round(
          (solvedCount /
            problems.length) * 100
        );


  return (

    <section className="practice-section">

      <div className="practice-header">

        <div>

          <span className="practice-label">
            PRACTICE
          </span>

          <h2>{title}</h2>

          <p>
            Solve these problems to strengthen
            your understanding and track your
            progress.
          </p>

        </div>


        <div className="practice-percentage">
          {percentage}%
        </div>

      </div>


      {/* PROGRESS BAR */}

      <div className="practice-progress">

        <div
          className="practice-progress-fill"
          style={{
            width: `${percentage}%`
          }}
        />

      </div>


      <p className="solved-count">

        {solvedCount} / {problems.length}
        {" "}problems solved

      </p>


      {/* QUESTIONS */}

      <div className="problem-list">

        {problems.map((problem) => {

          const isSolved =
            solvedProblems.includes(
              problem.id
            );


          return (

            <div
              className={`problem-card ${
                isSolved ? "solved" : ""
              }`}
              key={problem.id}
            >

              <div className="problem-info">

                <div className="problem-number">
                  {problem.number}
                </div>


                <div>

                  <h3>
                    {problem.title}
                  </h3>

                  <span
                    className={`difficulty ${problem.difficulty.toLowerCase()}`}
                  >
                    {problem.difficulty}
                  </span>

                </div>

              </div>


              <div className="problem-actions">

                <a
                  href={problem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="open-problem"
                >
                  Open Problem ↗
                </a>


                <button
                  onClick={() =>
                    toggleProblem(problem.id)
                  }
                  className={
                    isSolved
                      ? "solved-button"
                      : "solve-button"
                  }
                >

                  {isSolved
                    ? "✓ Solved"
                    : "Mark as Solved"}

                </button>

              </div>

            </div>

          );

        })}

      </div>


      {!localStorage.getItem("token") && (

        <p className="login-progress-message">
          Login to save your problem progress.
        </p>

      )}


      {loading && (
        <p className="progress-loading">
          Loading progress...
        </p>
      )}

    </section>

  );

}

export default PracticeQuestions;