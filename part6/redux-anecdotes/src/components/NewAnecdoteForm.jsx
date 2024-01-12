import { useDispatch } from "react-redux"

import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const NewAnecdoteForm = () => {
	const dispatch = useDispatch()

	const addNote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createAnecdote(content))
		dispatch(setNotification('New anecdote created', 5))
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addNote}>
				<div><input name="anecdote"/></div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default NewAnecdoteForm