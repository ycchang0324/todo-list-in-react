import React, { Component } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import List from "../components/List";
import Select from "../components/Select";
import ReactDOM from "react-dom"

class TodoApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            todolist: [],
            status: 'All',
            serial: 0,
            filterlist: []          
        };
    }

    update(e){
        this.setState({input: e.target.value})
    }

    handleKeyUp = (event) => {
        if(event.charCode === 13 && event.target.value !== ''){
            let input = {
                value : event.target.value,
                isComplete: false,
                id: this.state.serial         
            }
            this.setState(state => ({
                todolist: state.todolist.concat(input),
                serial: state.serial + 1,
                       
            }));   
            event.target.value = '';          
        }        
    };

    updateStatus(e){
        this.setState({
           status: e.target.innerText
        });
    }

    changeState(e){
        
        let node = ReactDOM.findDOMNode(e.target).parentNode.parentNode;
        console.log(node.id)
        
        const newTodoList = [...this.state.todolist];

        newTodoList.forEach(items =>{
            if(items.id.toString() === node.id.toString()){
                    items.isComplete = !(items.isComplete);    
                    ReactDOM.findDOMNode(node).children[1].className =  items.isComplete ? 'todo-app__item-detail-complete' : 'todo-app__item-detail';            
            }
        });
        this.setState({
            todolist: newTodoList 
        });
    }

    delete(e){
        let node = ReactDOM.findDOMNode(e.target).parentNode;
        console.log(node.id)
        this.setState(state =>({
            todolist : state.todolist.filter( (input) => input.id.toString() !== node.id.toString())
        })) 
    }

    clear(e){
        this.setState(state => ({
            todolist: state.todolist.filter( (input) => input.isComplete === false)
        }))
    }

    render() {
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                    <Input update={this.update.bind(this)} handleKeyUp={this.handleKeyUp.bind(this)} />
                    <ul className="todo-app__list" id="todo-list">
                        <List todolist={this.state.todolist} status = {this.state.status} delete={this.delete.bind(this)} changeState={this.changeState.bind(this)}/>        
                    </ul>
                </section>
                <footer className="todo-app__footer">
                    <div className="todo-app__total" id="todo-total">
                        {this.state.todolist.length}   left
                    </div>
                    <ul className="todo-app__view-buttons">
                        <Select id = "button-all" updateStatus={this.updateStatus.bind(this)} value="All"></Select>
                        <Select id = "button-active" updateStatus={this.updateStatus.bind(this)} value="Active"></Select>
                        <Select id = "button-complete" updateStatus={this.updateStatus.bind(this)} value="Complete"></Select>
                    </ul>
                    <div className="todo-app__clean" onClick={this.clear.bind(this)}>
                        Clear Complete
                    </div>
                </footer>
            </>
        );
    }
}

export default TodoApp;