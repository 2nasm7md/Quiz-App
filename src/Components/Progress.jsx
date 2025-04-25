import React from "react";

const Progress = ({ max, totalPoints, points, index, newAnswer }) => {
  return (
    <header className="progress">
      <progress max={max} value={index + Number(newAnswer !== null)}></progress>
      <p>
        Questions : <strong>{index + 1}</strong>/ {max}
      </p>
      <p>
        <strong>{points}</strong>/ {totalPoints} points
      </p>
    </header>
  );
};

export default Progress;
