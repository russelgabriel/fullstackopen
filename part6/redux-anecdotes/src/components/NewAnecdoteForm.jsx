import { useDispatch } from "react-redux"

import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const NewAnecdoteForm = () => {
	const dispatch = useDispatch()

	const addNote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(createAnecdote(newAnecdote))
		dispatch(setNotification('New anecdote created'))
		setTimeout(() => {
			dispatch(removeNotification())
		}, 5000)
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