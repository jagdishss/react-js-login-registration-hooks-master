import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Form(props) {

    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date());
    function handleChange(e) {
        setName(e.target.value);
    }

    function handleDateChange(e) {
        setDate(e);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(name, date);
        setName("");
        setDate(new Date());
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            /> 
             <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                   Select Expiry Date
                </label>
            </h2>
            <DatePicker 
                selected={date} 
                onChange={date => handleDateChange(date)} 
                />
        
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}

export default Form;