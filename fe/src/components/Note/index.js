import React from 'react';
import * as styles from './styles.module.css';

export const Note = ({id, text, completed, toggleComplete, deleteTodo}) => {
    return (
        <div className={styles.todo}>
            <span className="material-icons" onClick={() => toggleComplete(id)}>
                {completed ? 'check_box' : 'check_box_outline_blank'}
            </span>
            <p className={styles.text}>{text}</p>
            <button className={styles.button} onClick={() => deleteTodo(id)}>
                <span className="material-icons">delete</span>
            </button>
        </div>
    )
}