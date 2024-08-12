import React, { useState, useRef } from "react";

function Player() {
  const [playerName, setPlayerName] = useState(null);
  const enteredName = useRef();

  function handleClick() {
    setPlayerName(enteredName.current.value);
    enteredName.current.value = "";
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ?? "unknown entity"}</h2>
      <p>
        <input type="text" placeholder="Enter Name" ref={enteredName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}

export default Player;
