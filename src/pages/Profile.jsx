import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

import "./Profile.css";


function Profile() {

  const [user, setUser] = useState(null);

  const [progress, setProgress] = useState({
    stack: {
      solvedProblems: []
    },
    queue: {
      solvedProblems: []
    },
    sorting: {
      solvedProblems: []
    },
    searching: {
      solvedProblems: []
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  // ==========================================
  // NUMBER OF QUESTIONS IN EACH TOPIC
  // ==========================================

  const totalProblems = {
    stack: 5,
    queue: 5,
    sorting: 5,
    searching: 5
  };


  // ==========================================
  // LOAD PROFILE + PROGRESS
  // ==========================================

  useEffect(() => {

    async function loadDashboard() {

      const token = localStorage.getItem("token");


      // User not logged in
      if (!token) {

        navigate("/login");

        return;
      }


      try {

        // =====================================
        // GET PROFILE
        // =====================================

        const profileResponse = await fetch(
          `${API_URL}/api/auth/profile`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );


        const profileData =
          await profileResponse.json();


        if (!profileResponse.ok) {

          localStorage.removeItem("token");

          navigate("/login");

          return;
        }


        setUser(profileData.user);


        // =====================================
        // GET PROGRESS
        // =====================================

        const progressResponse = await fetch(
          `${API_URL}/api/progress`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );


        const progressData =
          await progressResponse.json();


        if (!progressResponse.ok) {

          setError(
            progressData.message ||
            "Unable to load progress"
          );

          return;
        }


        setProgress(progressData.progress);


      } catch (error) {

        console.error(
          "Dashboard error:",
          error
        );


        setError(
          "Unable to connect to server"
        );


      } finally {

        setLoading(false);

      }

    }


    loadDashboard();

  }, [navigate]);


  // ==========================================
  // LOGOUT
  // ==========================================

  function handleLogout() {

    localStorage.removeItem("token");

    navigate("/login");

  }


  // ==========================================
  // GET SOLVED COUNT
  // ==========================================

  function getSolvedCount(topic) {

    return (
      progress[topic]
        ?.solvedProblems
        ?.length || 0
    );

  }


  // ==========================================
  // GET TOPIC PERCENTAGE
  // ==========================================

  function getTopicPercentage(topic) {

    const solved =
      getSolvedCount(topic);


    const total =
      totalProblems[topic];


    if (total === 0) {
      return 0;
    }


    return Math.round(
      (solved / total) * 100
    );

  }


  // ==========================================
  // OVERALL PROGRESS
  // ==========================================

  const totalSolved =
    getSolvedCount("stack") +
    getSolvedCount("queue") +
    getSolvedCount("sorting") +
    getSolvedCount("searching");


  const totalQuestions =
    totalProblems.stack +
    totalProblems.queue +
    totalProblems.sorting +
    totalProblems.searching;


  const overallPercentage =
    totalQuestions === 0
      ? 0
      : Math.round(
          (totalSolved / totalQuestions) * 100
        );


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="profile-status">

        Loading profile...

      </div>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <div className="profile-status">

        {error}

      </div>

    );

  }


  return (

    <div className="profile-page">

      <div className="profile-container">


        {/* ==================================
            USER PROFILE
        =================================== */}

        <div className="profile-header">


          <div className="profile-avatar">

            {user?.name
              ?.charAt(0)
              .toUpperCase()}

          </div>


          <div>

            <span className="profile-label">

              YOUR PROFILE

            </span>


            <h1>

              Welcome, {user?.name}

            </h1>


            <p>

              {user?.email}

            </p>

          </div>


        </div>


        {/* ==================================
            PROGRESS SECTION
        =================================== */}

        <div className="profile-progress-section">


          <div className="progress-heading">


            <div>

              <span>
                LEARNING JOURNEY
              </span>

              <h2>
                Your Progress
              </h2>

            </div>


            <div className="progress-percent">

              {overallPercentage}%

            </div>


          </div>


          {/* OVERALL PROGRESS BAR */}

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width:
                  `${overallPercentage}%`
              }}
            />

          </div>


          <p className="overall-problem-count">

            {totalSolved} / {totalQuestions}
            {" "}problems solved

          </p>


          {/* ==================================
              TOPIC CARDS
          =================================== */}

          <div className="progress-grid">


            {/* STACK */}

            <div className="progress-card">

              <div className="topic-card-heading">

                <h3>
                  Stack
                </h3>

                <strong>
                  {getTopicPercentage("stack")}%
                </strong>

              </div>


              <p>
                Practice stack and monotonic
                stack problems.
              </p>


              <div className="topic-progress-bar">

                <div
                  className="topic-progress-fill"
                  style={{
                    width:
                      `${getTopicPercentage(
                        "stack"
                      )}%`
                  }}
                />

              </div>


              <span>

                {getSolvedCount("stack")}
                {" / "}
                {totalProblems.stack}
                {" solved"}

              </span>


              <button
                className="continue-button"
                onClick={() =>
                  navigate("/stack")
                }
              >

                Practice Stack →

              </button>

            </div>


            {/* QUEUE */}

            <div className="progress-card">

              <div className="topic-card-heading">

                <h3>
                  Queue
                </h3>

                <strong>
                  {getTopicPercentage("queue")}%
                </strong>

              </div>


              <p>
                Practice queue and FIFO based
                problems.
              </p>


              <div className="topic-progress-bar">

                <div
                  className="topic-progress-fill"
                  style={{
                    width:
                      `${getTopicPercentage(
                        "queue"
                      )}%`
                  }}
                />

              </div>


              <span>

                {getSolvedCount("queue")}
                {" / "}
                {totalProblems.queue}
                {" solved"}

              </span>


              <button
                className="continue-button"
                onClick={() =>
                  navigate("/queue")
                }
              >

                Practice Queue →

              </button>

            </div>


            {/* SORTING */}

            <div className="progress-card">

              <div className="topic-card-heading">

                <h3>
                  Sorting
                </h3>

                <strong>
                  {getTopicPercentage("sorting")}%
                </strong>

              </div>


              <p>
                Practice sorting based
                algorithm problems.
              </p>


              <div className="topic-progress-bar">

                <div
                  className="topic-progress-fill"
                  style={{
                    width:
                      `${getTopicPercentage(
                        "sorting"
                      )}%`
                  }}
                />

              </div>


              <span>

                {getSolvedCount("sorting")}
                {" / "}
                {totalProblems.sorting}
                {" solved"}

              </span>


              <button
                className="continue-button"
                onClick={() =>
                  navigate("/sorting")
                }
              >

                Practice Sorting →

              </button>

            </div>


            {/* SEARCHING */}

            <div className="progress-card">

              <div className="topic-card-heading">

                <h3>
                  Searching
                </h3>

                <strong>
                  {getTopicPercentage("searching")}%
                </strong>

              </div>


              <p>
                Practice binary search and
                searching problems.
              </p>


              <div className="topic-progress-bar">

                <div
                  className="topic-progress-fill"
                  style={{
                    width:
                      `${getTopicPercentage(
                        "searching"
                      )}%`
                  }}
                />

              </div>


              <span>

                {getSolvedCount("searching")}
                {" / "}
                {totalProblems.searching}
                {" solved"}

              </span>


              <button
                className="continue-button"
                onClick={() =>
                  navigate("/searching")
                }
              >

                Practice Searching →

              </button>

            </div>


          </div>


        </div>


        {/* ==================================
            LOGOUT
        =================================== */}

        <button
          className="logout-button"
          onClick={handleLogout}
        >

          Logout

        </button>


      </div>

    </div>

  );

}


export default Profile;