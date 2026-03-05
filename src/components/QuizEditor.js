import React from "react";
import QuestionEditor from "./QuestionEditor";
class QuizEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quiz: {
        name: "",
        description: "",
        questions: [],
      },
    };
  }

  handleQuizChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      quiz: {
        ...this.state.quiz,
        [name]: value,
      },
    });
  };

  addQuestion = () => {
    const newQuestion = {
      name: "",
      description: "",
      //   sortOrder: 1,
      sortOrder: this.state.quiz.questions.length + 1,
      options: [],
      correctValues: [],
    };
    this.setState({
      quiz: {
        ...this.state.quiz,
        questions: [...this.state.quiz.questions, newQuestion],
      },
    });
  };

  updateQuestion = (index, question) => {
    const questions = [...this.state.quiz.questions];
    questions[index] = question;
    this.setState({
      quiz: {
        ...this.state.quiz,
        questions,
      },
    });
  };

  exportJSON = () => {
    if(this.state.quiz.name.trim() === ""|| this.state.quiz.description.trim() === ""){
      alert("Please fill Quiz Name and Description before exporting");
      return;
    }
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(this.state.quiz, null, 2));

    const link = document.createElement("a");
    link.href = dataStr;

    const now = new Date();
    const timestamp =
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0") +
      "_" +
      String(now.getHours()).padStart(2, "0") +
      ":" +
      String(now.getMinutes()).padStart(2, "0") +
      ":" +
      String(now.getSeconds()).padStart(2, "0");
    link.download = `quiz_${timestamp}.json`;

    link.click();
  };

  handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    this.setState({ fileName: file.name });
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        this.setState({ quiz: json });
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  render() {
    const { quiz } = this.state;
    return (
      <div className="container">
        <div className="card">
          <h2>Quiz Information</h2>

          <label>Quiz Name</label>
          <input
            name="name"
            placeholder="Quiz name"
            value={quiz.name}
            onChange={this.handleQuizChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Quiz description"
            value={quiz.description}
            onChange={this.handleQuizChange}
          />
        </div>

        <div className="card">
          <h2>Questions</h2>

          {quiz.questions.map((q, index) => (
            <QuestionEditor
              key={index}
              question={q}
              onChange={(question) => this.updateQuestion(index, question)}
            />
          ))}
          <br />
          <button onClick={this.addQuestion}>Add Question</button>
        </div>
        <div className="card export-import-section">
          <div>
            <button onClick={this.exportJSON} style={{ marginBottom: "10px" }}>
              Export JSON
            </button>
          </div>
          <div>
            <h4>Import JSON</h4>
            <input type="file" accept=".json" onChange={this.handleImport} />
          </div>
        </div>
      </div>
    );
  }
}
export default QuizEditor;
