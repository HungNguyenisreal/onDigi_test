import "./App.css";
import QuizEditor from "./components/QuizEditor";
import "./styles/global.scss";

function App() {
  return (
    <div className="App">
      <div>
        <h1>Quiz Editor</h1>
        <QuizEditor />
      </div>
    </div>
  );
}

export default App;
