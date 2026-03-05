import React from "react";
class OptionEditor extends React.Component {

    handleChange=(e)=>{
        const {name,value} = e.target;
        const option={
            ...this.props.option,
            [name]: value
        }
        this.props.onChange(option);
    }

    handleCorrectChange=(e)=>{
        const {value,checked} = e.target;
        this.props.onToggleCorrect(value,checked);
    }
    render(){
        const {option,isCorrect} = this.props;
        return (
            <div style={{ marginLeft: "20px" }}>
                <input 
                name="value"
                placeholder="Value option"
                value={option.value}
                onChange={this.handleChange}
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
                <input 
                    type="checkbox"
                    value={option.value}
                    checked={isCorrect}
                    onChange={this.handleCorrectChange}
                />
            </div>
        );
    }
}
export default OptionEditor;