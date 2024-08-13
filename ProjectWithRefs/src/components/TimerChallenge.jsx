import React, { useRef, useState } from "react";
import ResultModal from "./ResultModal";

function TimerChallenge({ title, targetTime }) {
  const [remainingTime, setRemainingTime] = useState(targetTime * 1000);
  const timer = useRef();
  const dialog = useRef();

  const activeTime = remainingTime > 0 && remainingTime < targetTime * 1000;

  if (remainingTime <= 0) {
      clearInterval(timer.current);
    dialog.current.showModal();
  }

  function handleReset() {
    setRemainingTime(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.showModal();
    clearInterval(timer.current);
  }

  return (
    <>
      {
        <ResultModal
          ref={dialog}
          targetTime={targetTime}
          onReset={handleReset}
          timeRemaining={remainingTime}
        />
      }
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={activeTime ? handleStop : handleStart}>
            {activeTime ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={activeTime ? "active" : undefined}>
          {activeTime ? "Time is running...." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
export default TimerChallenge;
