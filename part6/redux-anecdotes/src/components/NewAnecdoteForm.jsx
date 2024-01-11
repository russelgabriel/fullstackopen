import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const NewAnecdoteForm = () => {
	const dispatch = useDispatch()

	const addNote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createAnecdote(content))
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