import { useState } from "react";
import PracticeQuestions from "../components/PracticeQuestions";
import queueProblems from "../data/queueProblems";
import "./Queue.css";

function Queue() {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [message, setMessage] = useState(
    "Perform an operation to see what happens."
  );

  const [operationType, setOperationType] = useState("info");


  // ---------------- ENQUEUE ----------------

  function enqueueElement() {
    if (inputValue.trim() === "") {
      setMessage("Enter a value before adding it to the queue.");
      setOperationType("error");
      return;
    }

    setQueue([...queue, inputValue]);

    setMessage(`${inputValue} was added at the rear of the queue.`);
    setOperationType("enqueue");

    setInputValue("");
  }


  // ---------------- DEQUEUE ----------------

  function dequeueElement() {
    if (queue.length === 0) {
      setMessage("Cannot dequeue because the queue is empty.");
      setOperationType("error");
      return;
    }

    const frontElement = queue[0];

    setQueue(queue.slice(1));

    setMessage(`${frontElement} was removed from the front.`);
    setOperationType("dequeue");
  }


  // ---------------- FRONT ----------------

  function frontElement() {
    if (queue.length === 0) {
      setMessage("Cannot view front because the queue is empty.");
      setOperationType("error");
      return;
    }

    setMessage(`The front element is ${queue[0]}.`);
    setOperationType("front");
  }


  // ---------------- CLEAR ----------------

  function clearQueue() {
    setQueue([]);

    setMessage("All elements were removed from the queue.");
    setOperationType("clear");
  }


  return (
    <div className="queue-page">

      {/* HEADER */}

      <div className="queue-header">
        <span>DATA STRUCTURE</span>

        <h1>Queue Visualizer</h1>

        <p>
          Understand how a queue works using the
          First In, First Out (FIFO) principle.
        </p>
      </div>


      {/* CONTROLS */}

      <div className="queue-controls">

        <input
          type="number"
          placeholder="Enter a value"
          value={inputValue}
          onChange={(event) =>
            setInputValue(event.target.value)
          }
        />

        <button onClick={enqueueElement}>
          Enqueue
        </button>

        <button onClick={dequeueElement}>
          Dequeue
        </button>

        <button onClick={frontElement}>
          Front
        </button>

        <button onClick={clearQueue}>
          Clear
        </button>

      </div>


      {/* OPERATION STATUS */}

      <div className={`queue-message ${operationType}`}>

        <div className="queue-message-icon">
          {operationType === "enqueue" && "→"}
          {operationType === "dequeue" && "←"}
          {operationType === "front" && "👁"}
          {operationType === "clear" && "×"}
          {operationType === "error" && "!"}
          {operationType === "info" && "i"}
        </div>

        <div className="queue-message-details">

          <span>
            {operationType === "enqueue" && "ENQUEUE OPERATION"}
            {operationType === "dequeue" && "DEQUEUE OPERATION"}
            {operationType === "front" && "FRONT ELEMENT"}
            {operationType === "clear" && "QUEUE CLEARED"}
            {operationType === "error" && "INVALID OPERATION"}
            {operationType === "info" && "OPERATION STATUS"}
          </span>

          <p>{message}</p>

        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="queue-content">

        {/* QUEUE VISUALIZER */}

        <div className="queue-container">

          {queue.length === 0 ? (

            <p className="empty-queue">
              Queue is empty
            </p>

          ) : (

            <div className="queue-elements">

              {queue.map((value, index) => (

                <div className="queue-element" key={index}>

                  {index === 0 && (
                    <span className="front-label">
                      FRONT
                    </span>
                  )}

                  <span>{value}</span>

                  {index === queue.length - 1 && (
                    <span className="rear-label">
                      REAR
                    </span>
                  )}

                </div>

              ))}

            </div>

          )}

        </div>


        {/* INFORMATION */}

        <div className="queue-info">

          <h3>Queue Operations</h3>

          <div>
            <span>Enqueue</span>
            <strong>O(1)</strong>
          </div>

          <div>
            <span>Dequeue</span>
            <strong>O(1)*</strong>
          </div>

          <div>
            <span>Front</span>
            <strong>O(1)</strong>
          </div>

          <p>
            Queue follows <strong>FIFO</strong> —
            First In, First Out.
          </p>

          <small>
            *Conceptual queue complexity. This visualizer uses
            a JavaScript array for demonstration.
          </small>

        </div>

      </div>

      <PracticeQuestions
      title="Queue Practice Problems"
      topic="queue"
      problems={queueProblems}
      />

    </div>
  );
}

export default Queue;