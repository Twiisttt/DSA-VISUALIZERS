import { useState, useRef } from "react";
import PracticeQuestions from "../components/PracticeQuestions";
import searchingProblems from "../data/searchingProblems";
import "./Searching.css";

function Searching() {
  const [array, setArray] = useState([
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100
  ]);

  const [target, setTarget] = useState("");

  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState("linear");

  const [activeIndex, setActiveIndex] = useState(-1);

  const [foundIndex, setFoundIndex] = useState(-1);

  const [comparisons, setComparisons] = useState(0);

  const [isSearching, setIsSearching] = useState(false);

  const [message, setMessage] = useState(
    "Enter a target value and start searching."
  );

  // Mutable flag used to stop async searching
  const stopRef = useRef(false);


  // ------------------------------------------
  // DELAY
  // ------------------------------------------

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


  // ------------------------------------------
  // GENERATE ARRAY
  // ------------------------------------------

  function generateArray() {
    if (isSearching) return;

    const newArray = [];

    for (let i = 0; i < 10; i++) {
      const value = Math.floor(Math.random() * 90) + 10;
      newArray.push(value);
    }

    // Sorting allows same array to work with Binary Search
    newArray.sort((a, b) => a - b);

    setArray(newArray);

    setActiveIndex(-1);
    setFoundIndex(-1);
    setComparisons(0);

    setMessage("New sorted array generated.");
  }


  // ------------------------------------------
  // STOP SEARCH
  // ------------------------------------------

  function stopSearching() {
    stopRef.current = true;

    setActiveIndex(-1);

    setMessage("Searching stopped by user.");
  }


  // ------------------------------------------
  // LINEAR SEARCH
  // ------------------------------------------

  async function linearSearch() {
    if (isSearching) return;

    if (target === "") {
      setMessage("Enter a target value first.");
      return;
    }

    stopRef.current = false;

    setIsSearching(true);
    setFoundIndex(-1);
    setComparisons(0);

    const targetNumber = Number(target);

    let comparisonCount = 0;


    for (let i = 0; i < array.length; i++) {

      if (stopRef.current) {
        setActiveIndex(-1);
        setIsSearching(false);
        return;
      }


      setActiveIndex(i);

      comparisonCount++;

      setComparisons(comparisonCount);

      setMessage(
        `Comparing target ${targetNumber} with ${array[i]}`
      );

      await sleep(600);


      if (stopRef.current) {
        setActiveIndex(-1);
        setIsSearching(false);
        return;
      }


      if (array[i] === targetNumber) {

        setFoundIndex(i);

        setActiveIndex(-1);

        setMessage(
          `${targetNumber} found at index ${i}.`
        );

        setIsSearching(false);

        return;
      }
    }


    setActiveIndex(-1);

    setMessage(
      `${targetNumber} was not found in the array.`
    );

    setIsSearching(false);
  }


  // ------------------------------------------
  // BINARY SEARCH
  // ------------------------------------------

  async function binarySearch() {
    if (isSearching) return;

    if (target === "") {
      setMessage("Enter a target value first.");
      return;
    }


    stopRef.current = false;

    setIsSearching(true);
    setFoundIndex(-1);
    setComparisons(0);


    const targetNumber = Number(target);

    let left = 0;
    let right = array.length - 1;

    let comparisonCount = 0;


    while (left <= right) {

      if (stopRef.current) {
        setActiveIndex(-1);
        setIsSearching(false);
        return;
      }


      const middle = Math.floor(
        (left + right) / 2
      );


      setActiveIndex(middle);

      comparisonCount++;

      setComparisons(comparisonCount);

      setMessage(
        `Checking middle element ${array[middle]} at index ${middle}`
      );

      await sleep(700);


      if (stopRef.current) {
        setActiveIndex(-1);
        setIsSearching(false);
        return;
      }


      // TARGET FOUND

      if (array[middle] === targetNumber) {

        setFoundIndex(middle);

        setActiveIndex(-1);

        setMessage(
          `${targetNumber} found at index ${middle}.`
        );

        setIsSearching(false);

        return;
      }


      // TARGET IS GREATER

      if (array[middle] < targetNumber) {

        setMessage(
          `${targetNumber} is greater than ${array[middle]}, searching right half.`
        );

        left = middle + 1;

      }

      // TARGET IS SMALLER

      else {

        setMessage(
          `${targetNumber} is smaller than ${array[middle]}, searching left half.`
        );

        right = middle - 1;

      }


      await sleep(400);
    }


    setActiveIndex(-1);

    setMessage(
      `${targetNumber} was not found in the array.`
    );

    setIsSearching(false);
  }


  // ------------------------------------------
  // START SELECTED SEARCH
  // ------------------------------------------

  function startSearching() {

    if (selectedAlgorithm === "linear") {
      linearSearch();
    }

    else if (selectedAlgorithm === "binary") {
      binarySearch();
    }

  }


  return (
    <div className="searching-page">


      {/* HEADER */}

      <div className="searching-header">

        <span>ALGORITHM</span>

        <h1>Searching Visualizer</h1>

        <p>
          Watch how searching algorithms find a target
          element step by step.
        </p>

      </div>


      {/* CONTROLS */}

      <div className="searching-controls">


        <select
          value={selectedAlgorithm}

          onChange={(event) => {
            setSelectedAlgorithm(event.target.value);

            setActiveIndex(-1);
            setFoundIndex(-1);
            setComparisons(0);

            setMessage(
              "Enter a target value and start searching."
            );
          }}

          disabled={isSearching}
        >

          <option value="linear">
            Linear Search
          </option>

          <option value="binary">
            Binary Search
          </option>

        </select>


        <input
          type="number"
          placeholder="Target value"
          value={target}

          onChange={(event) =>
            setTarget(event.target.value)
          }

          disabled={isSearching}
        />


        <button
          onClick={generateArray}
          disabled={isSearching}
        >
          Generate Array
        </button>


        <button
          onClick={startSearching}
          disabled={isSearching}
        >
          Start Search
        </button>


        <button
          className="stop-search-btn"
          onClick={stopSearching}
          disabled={!isSearching}
        >
          Stop
        </button>

      </div>


      {/* STATUS */}

      <div className="searching-status">

        <div>

          <span>STATUS</span>

          <p>{message}</p>

        </div>


        <div className="search-counter">

          <span>Comparisons</span>

          <strong>{comparisons}</strong>

        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="searching-content">


        {/* VISUALIZER */}

        <div className="search-array-container">

          <div className="search-array">

            {array.map((value, index) => (

              <div
                key={index}

                className={`search-box ${
                  activeIndex === index
                    ? "active"
                    : ""
                } ${
                  foundIndex === index
                    ? "found"
                    : ""
                }`}
              >

                <span className="search-value">
                  {value}
                </span>

                <span className="search-index">
                  {index}
                </span>

              </div>

            ))}

          </div>


          <div className="search-legend">

            <div>
              <span className="legend-box checking"></span>
              Checking
            </div>

            <div>
              <span className="legend-box found-legend"></span>
              Found
            </div>

          </div>

        </div>


        {/* INFORMATION */}

        <div className="searching-info">


          {selectedAlgorithm === "linear" && (

            <>

              <h3>Linear Search</h3>

              <p>
                Linear Search checks each element one by
                one until the target is found or the end
                of the array is reached.
              </p>

              <div>
                <span>Best Case</span>
                <strong>O(1)</strong>
              </div>

              <div>
                <span>Average Case</span>
                <strong>O(n)</strong>
              </div>

              <div>
                <span>Worst Case</span>
                <strong>O(n)</strong>
              </div>

              <div>
                <span>Space</span>
                <strong>O(1)</strong>
              </div>

              <div>
                <span>Requires Sorted Array</span>
                <strong>No</strong>
              </div>

            </>

          )}


          {selectedAlgorithm === "binary" && (

            <>

              <h3>Binary Search</h3>

              <p>
                Binary Search compares the target with the
                middle element and repeatedly eliminates
                half of the remaining search space.
              </p>

              <div>
                <span>Best Case</span>
                <strong>O(1)</strong>
              </div>

              <div>
                <span>Average Case</span>
                <strong>O(log n)</strong>
              </div>

              <div>
                <span>Worst Case</span>
                <strong>O(log n)</strong>
              </div>

              <div>
                <span>Space</span>
                <strong>O(1)</strong>
              </div>

              <div>
                <span>Requires Sorted Array</span>
                <strong>Yes</strong>
              </div>

            </>

          )}

        </div>

      </div>

      <PracticeQuestions
        title="Searching Practice Problems"
        topic="searching"
        problems={searchingProblems}
        />

    </div>
  );
}

export default Searching;