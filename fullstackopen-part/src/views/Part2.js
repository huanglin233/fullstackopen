// Part2 练习

import { useState } from 'react';
import requestUtil from '../api/requestUtil';

import Text from '../component/Text';

const Note = ({ note }) => {
    return (
        <li>{note.content}</li>
    )
}

const Part2 = (props) => {

    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState(' a new note...');
    const [showAll, setShowAll] = useState(true);

    const addNote = (event) => {
        event.preventDefault();
        console.log("button clicked", event.target);
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        }

        requestUtil.save(noteObject).then(res => {
            console.log(res);
        })
        setNewNote('');
        getAll();
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

    const getAll = () => {
        requestUtil.getAll().then(res => { 
            if(res) {
                console.log(res);
                
                setNotes(res);
            }
        })
    }

    return (
        <div> <Text text="Part2"></Text> <h1>notes</h1>
            <ul>
                {notes.map(note => <Note key={note.id} note={note}></Note>)}
            </ul>
            <div>------true------</div>
            <ul>
                {notesToShow.map(note => 
                    <Note key={note.id} note={note}></Note>
                )}
            </ul>
            <form onSubmit={addNote}>
                <input
                 value={newNote}
                 onChange={handleNoteChange}   
                 />
                <button type="submit">save</button>
            </form>
            <div>
                <button onClick={getAll}>getAll</button>
            </div>
        </div>
    )
}
export default Part2;
