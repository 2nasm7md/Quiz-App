import React, { useEffect } from "react";

const Timer = ({ onDispatch, seconedsRemaining }) => {
  const mins = Math.floor(seconedsRemaining / 60);
  const secs = seconedsRemaining % 60;
  useEffect(() => {
    const id = setInterval(() => onDispatch({ type: "tick" }), 1000);
    return () => clearInterval(id);
  }, [onDispatch]);
  return (
    <div className="timer">
      {`${mins < 10 ? `0${mins}` : mins}`}:{`${secs < 10 ? `0${secs}` : secs}`}
    </div>
  );
};

export default Timer;
