import { useState } from "react"

const NoteForm = ({ createNote }) => {
	const [newNote, setNewNote] = useState('')

	const addNote = (event) => {
		event.preventDefault()
		createNote({
			content: newNote,
			important: true
		})
		setNewNote('')
	}
	return (
		<div>
			<h2>Create a new note</h2>
			<form onSubmit={addNote}>
				<input onChange={(e => setNewNote(e.target.value))} value={newNote}/>
				<button type='submit'>save</button>
			</form>
		</div>
	)
}

export default NoteForm