import React from "react"; 

const Input = (props) =>
    <input className="todo-app__input" 
        id="todo-input" 
        placeholder="What needs to be done?"
        onChange={props.update} 
        onKeyPress={props.handleKeyUp}/>

export default Input;
