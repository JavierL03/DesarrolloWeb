import List from "./List";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState} from 'react';
import {
    addTodo,  
    selectTodos
    
Create Jira Issue
} from '../reducers/todoSlice'
import { useRef } from "react";

Create Jira Issue
export function Todos(){
    const dispatch = useDispatch();
    Create Jira Issue
    const todos = useSelector(selectTodos);
    const inputRef = useRef();
    }
    const addItem = (e) => {
    e.preventDefault();
    console.log(inputRef.current);
    dispatch(addTodo(['name': inputRef.current.value]))
}

return (
    <div>
    Create Jira Issue
    <h1>Todo List</h1>
    Create Jira Issue
    <input type="text" placeholder="Add Todo" ref={inputRef} />
    Create Jira Issue
    <button onClick={addItem}>Add Todo</button>
    Create Jira Issue
    <List items={todos} />
    </div>
);