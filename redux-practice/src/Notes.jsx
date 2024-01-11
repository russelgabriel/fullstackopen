import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from './reducers/noteReducer'

// Presentational component
// Only responsible for rendering
const Note = ({ note, handleClick }) => {
	return (
		<li onClick={handleClick} >
			{note.content} <strong>{note.important ? 'important' : ''}</strong>
		</li>
	)
}

// Container component
// Containes application logic
const Notes = () => {
	const dispatch = useDispatch()
	const notes = useSelector(({ filter, notes }) => {
		if (filter === 'ALL') {
			return notes
		} else {
			return (filter === 'IMPORTANT')
				? notes.filter(note => note.important)
				: notes.filter(note => !note.important)
		}
	})

	const toggleImportance = (id) => {
		dispatch(toggleImportanceOf(id))
	}
	return (
		<ul>
			{notes.map(note =>
				<Note key={note.id} note={note} handleClick={() => toggleImportance(note.id)}/>
			)}
		</ul>
	)
}

export default Notes