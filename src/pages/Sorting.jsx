import { useState, useRef } from "react";
import PracticeQuestions from "../components/PracticeQuestions";
import sortingProblems from "../data/sortingProblems";
import "./Sorting.css";

function Sorting() {
  const [array, setArray] = useState([
    45, 80, 30, 65, 25, 90, 50, 35
  ]);

  const [comparisons, setComparisons] = useState(0);
  const [activeIndices, setActiveIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState("bubble");

  const [message, setMessage] = useState(
    "Generate an array and choose a sorting algorithm."
  );

  // Used to stop async sorting immediately
  const stopRef = useRef(false);


  // ------------------------------------------------
  // DELAY
  // ------------------------------------------------

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


  // ------------------------------------------------
  // GENERATE ARRAY
  // ------------------------------------------------

  function generateArray() {
    if (isSorting) return;

    const newArray = [];

    for (let i = 0; i < 10; i++) {
      const value = Math.floor(Math.random() * 80) + 20;
      newArray.push(value);
    }

    setArray(newArray);
    setComparisons(0);
    setActiveIndices([]);

    setMessage("New random array generated.");
  }


  // ------------------------------------------------
  // STOP
  // ------------------------------------------------

  function stopSorting() {
    stopRef.current = true;

    setActiveIndices([]);
    setMessage("Sorting stopped by user.");
  }


  // ------------------------------------------------
  // BUBBLE SORT
  // ------------------------------------------------

  async function bubbleSort() {
    if (isSorting) return;

    stopRef.current = false;

    setIsSorting(true);
    setComparisons(0);

    const arr = [...array];

    let comparisonCount = 0;

    for (let i = 0; i < arr.length - 1; i++) {

      for (
        let j = 0;
        j < arr.length - i - 1;
        j++
      ) {

        if (stopRef.current) {
          setActiveIndices([]);
          setIsSorting(false);
          return;
        }

        setActiveIndices([j, j + 1]);

        comparisonCount++;

        setComparisons(comparisonCount);

        setMessage(
          `Comparing ${arr[j]} and ${arr[j + 1]}`
        );

        await sleep(500);


        if (stopRef.current) {
          setActiveIndices([]);
          setIsSorting(false);
          return;
        }


        if (arr[j] > arr[j + 1]) {

          const temp = arr[j];

          arr[j] = arr[j + 1];

          arr[j + 1] = temp;

          setArray([...arr]);

          setMessage(
            `Swapped ${arr[j]} and ${arr[j + 1]}`
          );

          await sleep(500);
        }
      }
    }

    setActiveIndices([]);

    setArray([...arr]);

    setMessage("Bubble Sort completed.");

    setIsSorting(false);
  }


  // ------------------------------------------------
  // SELECTION SORT
  // ------------------------------------------------

  async function selectionSort() {
    if (isSorting) return;

    stopRef.current = false;

    setIsSorting(true);
    setComparisons(0);

    const arr = [...array];

    let comparisonCount = 0;


    for (let i = 0; i < arr.length - 1; i++) {

      let minIndex = i;


      for (
        let j = i + 1;
        j < arr.length;
        j++
      ) {

        if (stopRef.current) {
          setActiveIndices([]);
          setIsSorting(false);
          return;
        }


        setActiveIndices([minIndex, j]);

        comparisonCount++;

        setComparisons(comparisonCount);

        setMessage(
          `Comparing ${arr[minIndex]} and ${arr[j]}`
        );

        await sleep(500);


        if (stopRef.current) {
          setActiveIndices([]);
          setIsSorting(false);
          return;
        }


        if (arr[j] < arr[minIndex]) {

          minIndex = j;

          setMessage(
            `${arr[minIndex]} is the new minimum.`
          );

          await sleep(300);
        }
      }


      if (minIndex !== i) {

        const temp = arr[i];

        arr[i] = arr[minIndex];

        arr[minIndex] = temp;

        setArray([...arr]);

        setMessage(
          `Placed ${arr[i]} at position ${i + 1}.`
        );

        await sleep(500);
      }
    }


    setActiveIndices([]);

    setArray([...arr]);

    setMessage("Selection Sort completed.");

    setIsSorting(false);
  }


  // ------------------------------------------------
  // MERGE SORT
  // ------------------------------------------------

  async function mergeSort() {
    if (isSorting) return;

    stopRef.current = false;

    setIsSorting(true);
    setComparisons(0);

    const arr = [...array];

    // We keep the comparison count locally
    const counter = {
      value: 0
    };


    // Start recursive Merge Sort
    const completed = await mergeSortRecursive(
      arr,
      0,
      arr.length - 1,
      counter
    );


    // If user stopped sorting
    if (!completed || stopRef.current) {

      setActiveIndices([]);
      setIsSorting(false);

      return;
    }


    setArray([...arr]);

    setActiveIndices([]);

    setMessage("Merge Sort completed.");

    setIsSorting(false);
  }


  // ------------------------------------------------
  // MERGE SORT RECURSION
  // ------------------------------------------------

  async function mergeSortRecursive(
    arr,
    left,
    right,
    counter
  ) {

    // STOP CHECK
    if (stopRef.current) {
      return false;
    }


    // Base case
    if (left >= right) {
      return true;
    }


    // Find middle
    const middle = Math.floor(
      (left + right) / 2
    );


    setMessage(
      `Dividing array from index ${left} to ${right}`
    );

    await sleep(300);


    // Sort left half
    const leftCompleted =
      await mergeSortRecursive(
        arr,
        left,
        middle,
        counter
      );


    if (!leftCompleted || stopRef.current) {
      return false;
    }


    // Sort right half
    const rightCompleted =
      await mergeSortRecursive(
        arr,
        middle + 1,
        right,
        counter
      );


    if (!rightCompleted || stopRef.current) {
      return false;
    }


    // Merge both sorted halves
    return await merge(
      arr,
      left,
      middle,
      right,
      counter
    );
  }


  // ------------------------------------------------
  // MERGE
  // ------------------------------------------------

  async function merge(
    arr,
    left,
    middle,
    right,
    counter
  ) {

    const leftArray =
      arr.slice(left, middle + 1);

    const rightArray =
      arr.slice(middle + 1, right + 1);


    let i = 0;
    let j = 0;
    let k = left;


    while (
      i < leftArray.length &&
      j < rightArray.length
    ) {

      if (stopRef.current) {
        return false;
      }


      setActiveIndices([
        left + i,
        middle + 1 + j
      ]);


      counter.value++;

      setComparisons(counter.value);


      setMessage(
        `Comparing ${leftArray[i]} and ${rightArray[j]}`
      );


      await sleep(500);


      if (stopRef.current) {
        return false;
      }


      if (leftArray[i] <= rightArray[j]) {

        arr[k] = leftArray[i];

        i++;

      } else {

        arr[k] = rightArray[j];

        j++;

      }


      k++;


      // Update visualization
      setArray([...arr]);

      await sleep(300);
    }


    // Copy remaining left elements
    while (i < leftArray.length) {

      if (stopRef.current) {
        return false;
      }

      arr[k] = leftArray[i];

      i++;
      k++;

      setArray([...arr]);

      await sleep(250);
    }


    // Copy remaining right elements
    while (j < rightArray.length) {

      if (stopRef.current) {
        return false;
      }

      arr[k] = rightArray[j];

      j++;
      k++;

      setArray([...arr]);

      await sleep(250);
    }


    setMessage(
      `Merged section from index ${left} to ${right}`
    );

    await sleep(300);

    return true;
  }


  // ------------------------------------------------
  // START SELECTED SORT
  // ------------------------------------------------

  function startSorting() {

    if (selectedAlgorithm === "bubble") {
      bubbleSort();
    }

    else if (selectedAlgorithm === "selection") {
      selectionSort();
    }

    else if (selectedAlgorithm === "merge") {
      mergeSort();
    }

  }


  // ------------------------------------------------
  // JSX
  // ------------------------------------------------

  return (

    <div className="sorting-page">


      {/* HEADER */}

      <div className="sorting-header">

        <span>ALGORITHM</span>

        <h1>Sorting Visualizer</h1>

        <p>
          Watch how sorting algorithms compare and move
          elements step by step.
        </p>

      </div>


      {/* CONTROLS */}

      <div className="sorting-controls">


        <select
          value={selectedAlgorithm}

          onChange={(event) =>
            setSelectedAlgorithm(event.target.value)
          }

          disabled={isSorting}
        >

          <option value="bubble">
            Bubble Sort
          </option>

          <option value="selection">
            Selection Sort
          </option>

          <option value="merge">
            Merge Sort
          </option>

        </select>


        <button
          onClick={generateArray}
          disabled={isSorting}
        >
          Generate Array
        </button>


        <button
          onClick={startSorting}
          disabled={isSorting}
        >
          Start Sorting
        </button>


        <button
          className="stop-btn"
          onClick={stopSorting}
          disabled={!isSorting}
        >
          Stop
        </button>

      </div>


      {/* STATUS */}

      <div className="sorting-status">

        <div>

          <span>STATUS</span>

          <p>
            {message}
          </p>

        </div>


        <div className="comparison-counter">

          <span>
            Comparisons
          </span>

          <strong>
            {comparisons}
          </strong>

        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="sorting-content">


        {/* BARS */}

        <div className="sorting-visualizer">

          {array.map((value, index) => (

            <div

              className={`sorting-bar ${
                activeIndices.includes(index)
                  ? "active"
                  : ""
              }`}

              key={index}

              style={{
                height: `${value * 3}px`
              }}

            >

              <span>
                {value}
              </span>

            </div>

          ))}

        </div>


        {/* INFORMATION */}

        <div className="sorting-info">


          {/* BUBBLE */}

          {selectedAlgorithm === "bubble" && (

            <>

              <h3>Bubble Sort</h3>

              <p>
                Bubble Sort repeatedly compares adjacent
                elements and swaps them when they are in
                the wrong order.
              </p>

              <div>
                <span>Best Case</span>
                <strong>O(n²)</strong>
              </div>

              <div>
                <span>Average Case</span>
                <strong>O(n²)</strong>
              </div>

              <div>
                <span>Worst Case</span>
                <strong>O(n²)</strong>
              </div>

              <div>
                <span>Space</span>
                <strong>O(1)</strong>
              </div>

              <div>
                <span>Stable</span>
                <strong>Yes</strong>
              </div>

            </>

          )}


          {/* SELECTION */}

          {selectedAlgorithm === "selection" && (

            <>

              <h3>Selection Sort</h3>

              <p>
                Selection Sort finds the smallest element
                from the unsorted portion and places it
                at the beginning.
              </p>

              <div>
                <span>Best Case</span>
                <strong>O(n²)</strong>
              </div>

              <div>
                <span>Average Case</span>
                <strong>O(n²)</strong>
              </div>

              <div>
                <span>Worst Case</span>
                <strong>O(n²)</strong>
              </div>

              <div>
                <span>Space</span>
                <strong>O(1)</strong>
              </div>

              <div>
                <span>Stable</span>
                <strong>No</strong>
              </div>

            </>

          )}


          {/* MERGE */}

          {selectedAlgorithm === "merge" && (

            <>

              <h3>Merge Sort</h3>

              <p>
                Merge Sort uses the Divide and Conquer
                technique. It recursively divides the
                array into smaller halves and then merges
                those halves back in sorted order.
              </p>

              <div>
                <span>Best Case</span>
                <strong>O(n log n)</strong>
              </div>

              <div>
                <span>Average Case</span>
                <strong>O(n log n)</strong>
              </div>

              <div>
                <span>Worst Case</span>
                <strong>O(n log n)</strong>
              </div>

              <div>
                <span>Space</span>
                <strong>O(n)</strong>
              </div>

              <div>
                <span>Stable</span>
                <strong>Yes</strong>
              </div>

            </>

          )}

        </div>

      </div>

      <PracticeQuestions
      title="Sorting Practice Problems"
      topic="sorting"
      problems={sortingProblems}
      />

    </div>
  );
}

export default Sorting;