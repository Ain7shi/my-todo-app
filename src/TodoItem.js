import React from 'react';

function TodoItem(props) {
    const dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0);
    const savedDate = new Date(props.todo.due);
    savedDate.setHours(0, 0, 0, 0);
    const dueInMilli = savedDate - dateToday;
    const dueInDays = Math.ceil(dueInMilli / (1000 * 60 * 60 * 24))
    // console.log(dueInDays);
    // const daysOverdue = '';

    return (
        
        <li className={`todo-item ${props.todo.prio === 1 ? 'low' : props.todo.prio === 2 ? 'mid' : props.todo.prio ===3 ? 'high' : '' } ${dateToday <= savedDate ? '' : 'overdue'}`}>
            
            <input
            type="checkbox"
            checked={props.todo.completed}
            onChange={() => props.onToggle(props.todo.id)}
            />

            <span
            className={props.todo.completed ? 'completed' : '' }
            >
                {props.todo.text}
                {props.todo.id}  
            </span>
            <span className="todo-right">
                {dueInDays >= 0 ? `| Due in ${dueInDays} day${dueInDays === 1 ? '' : 's'}` : `| Overdue by ${Math.abs(dueInDays)} day${Math.abs(dueInDays) === 1 ? '' : 's'}`}
            </span>
            <button onClick={props.onHandleShow}>Edit</button>
            <button
            onClick={() => props.onDelete(props.todo.id)}
            className="delete-btn"
            >
                Delete
            </button>
            
        </li>

        
    );
}

export default TodoItem;