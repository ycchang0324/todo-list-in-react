import React from "react"; 
import icon from "../img/x.png";


const List = (props) => props.todolist.map((input) => 
        <li className="todo-app__item" key={input.id} id={input.id} style={ 
            ((props.status === 'Complete' && input.isComplete === false) 
            ||(props.status === 'Active' && input.isComplete === true)) ? {display:"none"} : {} }>
        <div className="todo-app__checkbox" >
            <input className="todo-app__checkbox-input" type="checkbox" id={"checkbox" + input.id} onClick={props.changeState}></input>
            <label htmlFor={"checkbox" + input.id}/>
        </div>
        <h1 className="todo-app__item-detail">{input.value}</h1>
        <img className="todo-app__item-x" src={icon} alt="x" onClick={props.delete} />
    </li>
)

export default List;