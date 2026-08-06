import { useState } from "react";

import PracticeQuestions from "../components/PracticeQuestions";
import stackProblems from "../data/stackProblems";

import "./Stack.css";


function Stack() {

  // Stores all stack elements
  const [stack, setStack] = useState([]);

  // Stores the value typed inside the input
  const [inputValue, setInputValue] = useState("");

  // Shows what operation was performed
  const [message, setMessage] = useState(
    "Perform an operation to see what happens."
  );

  // Used for operation message styling
  const [operationType, setOperationType] =
    useState("info");


  // ==========================================
  // PUSH
  // ==========================================

  function pushElement() {

    if (inputValue.trim() === "") {

      setMessage(
        "Enter a value before pushing."
      );

      setOperationType("error");

      return;
    }


    setStack([
      ...stack,
      inputValue
    ]);


    setMessage(
      `${inputValue} was pushed onto the stack.`
    );


    setOperationType("push");


    setInputValue("");

  }


  // ==========================================
  // POP
  // ==========================================

  function popElement() {

    if (stack.length === 0) {

      setMessage(
        "Cannot pop because the stack is empty."
      );

      setOperationType("error");

      return;
    }


    const topElement =
      stack[stack.length - 1];


    setStack(
      stack.slice(0, -1)
    );


    setMessage(
      `${topElement} was removed from the top.`
    );


    setOperationType("pop");

  }


  // ==========================================
  // PEEK
  // ==========================================

  function peekElement() {

    if (stack.length === 0) {

      setMessage(
        "Cannot peek because the stack is empty."
      );

      setOperationType("error");

      return;
    }


    const topElement =
      stack[stack.length - 1];


    setMessage(
      `The current top element is ${topElement}.`
    );


    setOperationType("peek");

  }


  // ==========================================
  // CLEAR
  // ==========================================

  function clearStack() {

    setStack([]);


    setMessage(
      "All elements were removed from the stack."
    );


    setOperationType("clear");

  }


  return (

    <div className="stack-page">


      {/* ======================================
          STACK HEADING
      ======================================= */}

      <div className="stack-header">

        <span>
          DATA STRUCTURE
        </span>


        <h1>
          Stack Visualizer
        </h1>


        <p>
          Understand how a stack works using the
          Last In, First Out (LIFO) principle.
        </p>

      </div>


      {/* ======================================
          STACK CONTROLS
      ======================================= */}

      <div className="stack-controls">


        <input
          type="number"
          placeholder="Enter a value"
          value={inputValue}
          onChange={(event) =>
            setInputValue(event.target.value)
          }
        />


        <button onClick={pushElement}>
          Push
        </button>


        <button onClick={popElement}>
          Pop
        </button>


        <button onClick={peekElement}>
          Peek
        </button>


        <button onClick={clearStack}>
          Clear
        </button>


      </div>


      {/* ======================================
          OPERATION MESSAGE
      ======================================= */}

      <div
        className={
          `operation-message ${operationType}`
        }
      >


        <div className="operation-icon">

          {operationType === "push" && "↓"}

          {operationType === "pop" && "↑"}

          {operationType === "peek" && "👁"}

          {operationType === "clear" && "×"}

          {operationType === "error" && "!"}

          {operationType === "info" && "i"}

        </div>


        <div className="operation-details">


          <span>

            {operationType === "push" &&
              "PUSH OPERATION"}

            {operationType === "pop" &&
              "POP OPERATION"}

            {operationType === "peek" &&
              "PEEK OPERATION"}

            {operationType === "clear" &&
              "STACK CLEARED"}

            {operationType === "error" &&
              "INVALID OPERATION"}

            {operationType === "info" &&
              "OPERATION STATUS"}

          </span>


          <p>
            {message}
          </p>


        </div>


      </div>


      {/* ======================================
          VISUALIZER + INFORMATION
      ======================================= */}

      <div className="stack-content">


        {/* STACK VISUALIZER */}

        <div className="stack-container">


          {stack.length === 0 ? (

            <p className="empty-stack">

              Stack is empty

            </p>

          ) : (

            [...stack]
              .reverse()
              .map((value, index) => (

                <div
                  className="stack-element"
                  key={index}
                >

                  <span>
                    {value}
                  </span>


                  {index === 0 && (

                    <span className="top-label">

                      ← TOP

                    </span>

                  )}


                </div>

              ))

          )}


        </div>


        {/* ====================================
            STACK INFORMATION
        ===================================== */}

        <div className="stack-info">


          <h3>
            Stack Operations
          </h3>


          <div>

            <span>
              Push
            </span>

            <strong>
              O(1)
            </strong>

          </div>


          <div>

            <span>
              Pop
            </span>

            <strong>
              O(1)
            </strong>

          </div>


          <div>

            <span>
              Peek
            </span>

            <strong>
              O(1)
            </strong>

          </div>


          <p>

            Stack follows{" "}

            <strong>
              LIFO
            </strong>

            {" "}— Last In, First Out.

          </p>


        </div>


      </div>


      {/* ======================================
          STACK PRACTICE QUESTIONS
      ======================================= */}

      <PracticeQuestions
        title="Stack Practice Problems"
        topic="stack"
        problems={stackProblems}
      />


    </div>

  );

}


export default Stack;