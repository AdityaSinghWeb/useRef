import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, onReset, timeRemaining },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  let lostGame = timeRemaining <= 0;
  let formattedRemainingTime = (timeRemaining / 1000).toFixed(2);
  let score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {lostGame && <h2>You Lost</h2>}
      {!lostGame && <h2>Your Score: {score}</h2>}
      <p>
        The target time was{" "}
        <strong>
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
