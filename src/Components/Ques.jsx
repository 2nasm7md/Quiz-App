import Timer from "./Timer";
export default function Ques({
  children,
  question,
  onDispatch,
  newAnswer,
  index,
  seconedsRemaining,
  questionsLength,
}) {
  const hasAnswered = newAnswer !== null;
  return (
    <>
      {children}
      <div>
        <h4>{question.question}</h4>
        <div className="options">
          {question.options.map((op, i) => (
            <button
              className={`btn btn-option ${newAnswer === i ? "answer" : ""} ${
                hasAnswered
                  ? question.correctOption === i
                    ? "correct"
                    : "wrong"
                  : null
              }`}
              key={op}
              onClick={() => {
                onDispatch({ type: "answered", payload: i });
              }}
              disabled={hasAnswered}
            >
              {op}
            </button>
          ))}
        </div>

        <footer>
          <div>
            <Timer
              onDispatch={onDispatch}
              seconedsRemaining={seconedsRemaining}
            />
            {hasAnswered && index < questionsLength - 1 && (
              <button
                className="btn btn-ui"
                onClick={() => onDispatch({ type: "nextQues" })}
              >
                Next
              </button>
            )}
            {index === questionsLength - 1 && (
              <button
                className="btn btn-ui"
                onClick={() => onDispatch({ type: "finished" })}
              >
                Finish
              </button>
            )}
          </div>
        </footer>
      </div>
    </>
  );
}
