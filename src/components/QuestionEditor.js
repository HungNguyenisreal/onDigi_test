import React from "react";
import OptionEditor from "./OptionEditor";

class QuestionEditor extends React.Component {
  handleChange = (e) => {
    const { name, value } = e.target;
    const question = {
      ...this.props.question,
      [name]: value,
    };
    this.props.onChange(question);
  };

  addOption = () => {
    const question = { ...this.props.question };
    const newOption = {
      value: "",
      label: "",
      // sortOrder:1
      sortOrder: question.options.length + 1,
    };
    question.options.push(newOption);
    this.props.onChange(question);
  };

  updateOption = (index, option, correctValues) => {
    const question = { ...this.props.question };
    question.options[index] = option;
    question.correctValues = correctValues;
    this.props.onChange(question);

    
  };

  toggleCorrectOption = (value, checked, beforeValue) => {
    console.log(
      "toggleCorrectOption called with value:",
      value,
      "checked:",
      checked,
        "beforeValue:", beforeValue
    );
    const question = { ...this.props.question };
    let correctValues = [...(question.correctValues || [])];
    if (checked) {
        correctValues.push(value);
    } else {
      console.log("th3");
      correctValues = correctValues.filter((v) => v !== value);
    }
    question.correctValues = correctValues;
    this.props.onChange(question);
  };

  render() {
    const { question } = this.props;
    console.log("QuestionEditor render:", question.correctValues);

    return (
      <div className="card">
        <h3>Question</h3>

        <label>Name</label>
        <input
          name="name"
          placeholder="Question name"
          value={question.name}
          onChange={this.handleChange}
        />

        <label>Description</label>
        <input
          name="description"
          placeholder="Question description"
          value={question.description}
          onChange={this.handleChange}
        />

        <label>Sort Order</label>
        <input
          name="sortOrder"
          type="number"
          placeholder="Question Sort order"
          value={question.sortOrder}
          onChange={this.handleChange}
        />

        <h4>
          Options (
          {question.correctValues?.map((v, index) => (
            <span key={index} className="correct-value">
              {v}
              {index < question.correctValues.length - 1 ? ", " : ""}
            </span>
          ))}
          )
        </h4>
        {question.options.map((o, i) => (
          <OptionEditor
            key={i}
            option={o}
            onChange={(option,correctValues) => this.updateOption(i, option,correctValues)}
            isCorrect={question.correctValues?.includes(o.value)}
            onToggleCorrect={this.toggleCorrectOption}
            beforeValue={o.value}
            correctValues={question.correctValues}
          />
        ))}

        <button onClick={this.addOption}>Add Option</button>
      </div>
    );
  }
}
export default QuestionEditor;
