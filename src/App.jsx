import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Ques from "./Components/Ques";
import Ans from "./Components/Ans";
import Start from "./Components/Start";
import Loader from "./Components/Loader";
import Progress from "./Components/Progress";
import Fininsh from "./Components/Fininsh";

const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
  newAnswer: null,
  points: 0,
  highScore: 0,
  seconedsRemaining: null,
};
const secondPerQ = 30;
function reducer(state, action) {
  switch (action.type) {
    case "Data Recieved":
      return { ...state, questions: action.payload, status: "Ready" };
    case "Data Load Failed":
      return { questions: action.payload, status: "Failed" };
    case "Data active":
      return {
        ...state,
        status: "active",
        seconedsRemaining: state.questions.length * secondPerQ,
      };
    case "finished": {
      const newHighScore =
        state.highScore > state.points ? state.highScore : state.points;
      return {
        ...state,
        status: "finished",
        highScore: newHighScore,
      };
    }
    case "restarted":
      return {
        ...state,
        status: "Ready",
        index: 0,
        newAnswer: null,
        points: 0,
      };
    case "nextQues":
      return { ...state, index: state.index++, newAnswer: null };
    case "answered": {
      const currentQues = state.questions[state.index];
      return {
        ...state,
        newAnswer: action.payload,
        points:
          action.payload === currentQues.correctOption
            ? state.points + currentQues.points
            : state.points,
      };
    }
    case "tick":
      return {
        ...state,
        status: state.seconedsRemaining === 0 ? "finished" : state.status,
        seconedsRemaining:
          state.seconedsRemaining > 0 ? state.seconedsRemaining - 1 : 0,
      };
  }
}
function App() {
  const [
    {
      questions,
      status,
      index,
      newAnswer,
      points,
      highScore,
      seconedsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const QuesNum = questions.length;
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        dispatch({ type: "Data Recieved", payload: data });
      } catch (err) {
        dispatch({ type: "Data Load Failed" });
        console.log(err);
      }
    }
    getData();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Ready" && (
          <Start QuesNum={QuesNum} onDispatch={dispatch} />
        )}
        {status === "Loading" && <Loader />}
        {status === "active" && (
          <Ques
            questionsLength={questions.length}
            question={questions[index]}
            newAnswer={newAnswer}
            onDispatch={dispatch}
            index={index}
            seconedsRemaining={seconedsRemaining}
          >
            <Progress
              max={QuesNum}
              totalPoints={totalPoints}
              points={points}
              index={index}
              newAnswer={newAnswer}
            />
          </Ques>
        )}
        {status === "finished" && (
          <Fininsh
            onDispatch={dispatch}
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
