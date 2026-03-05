import React from "react";
import OptionEditor from "./OptionEditor";

class QuestionEditor extends React.Component {
    handleChange = (e) => {
        const { name, value } = e.target;
        const question={
            ...this.props.question,
            [name]: value
        }
        this.props.onChange(question);
    }

    addOption=()=>{
        const question = {...this.props.question};
        const newOption={
            value:"",
            label:"",
            sortOrder:1
        };
        question.options.push(newOption);
        this.props.onChange(question);
    }

    updateOption=(index,option)=>{
        const question = {...this.props.question};
        question.options[index] = option;
        this.props.onChange(question);
    }

    toggleCorrectOption = (value, checked) => {
        const question = {...this.props.question};
        let correctValues = [...question.correctValues];
        if (checked) {
            correctValues.push(value);
        } else {
            correctValues = correctValues.filter((v) => v !== value);
        }
        question.correctValues = correctValues;
        this.props.onChange(question);
    }

    render(){
        const {question} = this.props;
        return (
            <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
                <h3>Question Editor</h3>
                <input 
                name="name"
                placeholder="Question name" 
                value={question.name}
                onChange={this.handleChange}
                />
                <br/>
                <input
                name="description"
                placeholder="Question description"
                value={question.description}
                onChange={this.handleChange}
                />
                <br/>
                <input 
                name="sortOrder"
                type="number"
                placeholder="Question Sort order"
                value={question.sortOrder}
                onChange={this.handleChange}
                />
                <h4>Options</h4>

                {
                    question.options.map((o,i)=>(
                        <OptionEditor
                        key={i}
                        option={o}
                        onChange={(option)=>this.updateOption(i,option)}
                        isCorrect={question.correctValues.includes(o.value)}
                        onToggleCorrect={this.toggleCorrectOption}
                        />
                    ))
                }
                <button onClick={this.addOption}>
                   Add Option 
                </button>
            </div>
        );
    }
}
export default QuestionEditor;