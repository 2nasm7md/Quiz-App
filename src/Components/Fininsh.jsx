import React from "react";

const Fininsh = ({ onDispatch, totalPoints, points, highScore }) => {
  const percentage = Math.floor((points / totalPoints) * 100);
  let emoji;
  if (percentage === 100) emoji = "😎";
  if (percentage > 80 && percentage < 100) emoji = "🥰";
  if (percentage > 50 && percentage < 80) emoji = "😉";
  if (percentage > 0 && percentage < 50) emoji = "😥";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <div className="result">
        <p>
          <span>{emoji}</span> You Scored <strong>{points}</strong> Out of{" "}
          {totalPoints} ({percentage}%)
        </p>
      </div>
      <p className="highscore">(HighScore: {highScore} Points)</p>
      <button
        className="btn btn-ui"
        onClick={() => onDispatch({ type: "restarted" })}
      >
        Restart
      </button>
    </>
  );
};

export default Fininsh;
