import React, { useEffect, useState } from "react";
import axios from "axios";
import { Note } from "./components/Note";
import * as styles from "./App.module.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      const response = await axios("/api/notes");
      setNotes(response.data);
    };

    getNotes();
  }, []);

  const createTodo = async () => {
    const {data: note} = await axios({
      method: 'post',
      url: '/api/notes',
      data: {text: userInput}
    });

    setNotes([...notes, note]);
    setUserInput('');
  }

  const toggleComplete = async (id) => {
    const {data: note} = await axios({
      method: 'patch',
      url: `/api/notes/${id}`
    });

    const newNotes = notes.map((n) => n.id === id ? note : n);
    setNotes(newNotes);
  }

  const deleteTodo = async (id) => {
    await axios({method: 'delete', url: `/api/notes/${id}`});

    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div className={styles.app}>
      <h2 className={styles.header}>Notes App</h2>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Add a new note"
          className={styles.input}
          onChange={e => setUserInput(e.target.value)}
        />
        <button onClick={createTodo} className={styles.button}>Go</button>
      </div>
      <div className={styles.notesList}>
        {notes.map((note) => {
          return <Note
            text={note.text}
            completed={note.complete}
            id={note.id}
            key={note.id}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        })}
      </div>
    </div>
  );
}

export default App;
