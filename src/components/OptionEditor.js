import React from "react";
class OptionEditor extends React.Component {
  handleChange = (e) => {
    const { name, value } = e.target;
    const option = {
      ...this.props.option,
      [name]: value,
    };
    this.props.onChange(option);
  };

  handleValueChange = (e, beforeValue) => {
    console.log("handleValueChange beforeValue:", beforeValue);
    const { name, value } = e.target;
    const option = {
      ...this.props.option,
      [name]: value,
    };

    //xoa neu la correct value cua option do
    let {correctValues } = this.props;

    if (correctValues?.includes(beforeValue)) {
      correctValues = correctValues.filter(
        (v) => v !== beforeValue
      );
    }
    this.props.onChange(option,correctValues);
  };

  handleCorrectChange = (e, beforeValue) => {
    const { value, checked } = e.target;
    this.props.onToggleCorrect(value, checked, beforeValue);
  };
  render() {
    const { option, isCorrect,beforeValue } = this.props;
    return (
      <div className={`option-row ${isCorrect ? "correct" : ""}`}>
        <input
          type="checkbox"
          value={option.value}
          checked={isCorrect}
          onChange={(e)=>this.handleCorrectChange(e, beforeValue)}
          disabled={option.value === ""}
        />
        <input
          name="value"
          placeholder="Value option"
          value={option.value}
          //   onChange={this.handleChange}
          onChange={(e) => this.handleValueChange(e,beforeValue)}
        />
        <input
          name="label"
          placeholder="Label option"
          value={option.label}
          onChange={this.handleChange}
        />

        <input
          name="sortOrder"
          type="number"
          placeholder="Sort order option"
          value={option.sortOrder}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
export default OptionEditor;
