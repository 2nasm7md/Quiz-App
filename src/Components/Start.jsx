import React from "react";

export default function Start({ QuesNum, onDispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{QuesNum} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => onDispatch({ type: "Data active" })}
      >
        Start Quiz
      </button>
    </div>
  );
}
