import React, { useState } from 'react';

function AddTodoForm(props) {
    const [inputText, setInputText] = useState('');
    const [selectPrio, setPrioSelection] = useState('')
    const [inputDate, setInputDate] = useState('')
    const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '' && selectPrio !== "" && inputDate !== "") {
        props.onAddTodo(inputText.trim(),parseInt(selectPrio),inputDate);
        setInputText('');
    }
    };


    return (
        <form onSubmit={handleSubmit} className="add-todo-form">
            <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter a new TODO..."
            className="todo-input"
            />

            <select id="PrioList" name="PrioList" value={selectPrio} onChange={(e) => setPrioSelection(e.target.value)}>
                <option value="">--Select Priority--</option>
                <option value="1">Low</option>
                <option value="2">Mid</option>
                <option value="3">High</option>
            </select>

            <input
            type="date"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            />

            <button type="submit" className="add-btn">
                Add TODO
            </button>
        </form>
    );
}

export default AddTodoForm;