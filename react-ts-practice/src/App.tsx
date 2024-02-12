import { useState, useEffect } from 'react';
import { getAllNotes, createNote } from './services/noteServices';

import { Note } from './types';

const App = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getAllNotes().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createNote({ content: newNote }).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
    setNewNote('')
  }

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">save</button>
      </form>
      <ul>
        {
          notes.map(note => {
            return (
              <li key={note.id}>{note.content}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default App;