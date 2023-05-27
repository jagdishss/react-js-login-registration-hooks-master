import React, { useState, useRef, useEffect } from "react";
import AuthService from "../services/auth.service";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState("")
    const [description, setDescription] = useState("")
    const [newDate, setNewDate] = useState(new Date());
    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleDateChange(e) {
        setNewDate(e);
    }

    function handleChangeComment(e) {
        setDescription(e.target.value);
        console.log(e);
    }
    function handleSubmit(e) {
        const currentUser = AuthService.getCurrentUser();
        e.preventDefault();
        props.editTask(props.id, newName, newDate);
        setNewName("");
        setNewDate(new Date());
        setEditing(false);
        AuthService.updateTodo(newName, newDate, false, currentUser.username, props.id);
      }
    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                
                <input id={props.id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleChange} />
                
                <label className="todo-label" htmlFor={props.id}>
                    New Date for
                </label>
             
                <DatePicker 
                selected={newDate} 
                onChange={date => handleDateChange(date)} 
                />
 <label className="todo-label" htmlFor={props.id}>
                    Provide your comments 
                </label>
                
                <input id={props.id}
                    className="todo-text"
                    type="text"
                    value={description}
                    onChange={handleChangeComment} />

            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}>
                    Cancel
                    <span className="visually-hidden">renaming {props.name}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save
                    <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );
    const viewTemplate = (
        <div className="stack-small">
            
            <div className="c-cb">
            <label className="todo-label" htmlFor={props.id}>
                    Tick to complete or uncomplete the task
                </label>
               <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todo-label" htmlFor={props.id}>
                   Task Name {props.name}
                </label>
                <label className="todo-label" htmlFor={props.id}>
                   Expiry On the Date
                </label>
                <DatePicker 
                selected={props.date} 
                onChange={date => handleDateChange(date)} 
                />
              
                
            </div>
            <div className="btn-group">
                <button type="button" className="btn" onClick={() => setEditing(true)}>
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.deleteTask(props.id)}>
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );

    return (
        <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>

    );
}