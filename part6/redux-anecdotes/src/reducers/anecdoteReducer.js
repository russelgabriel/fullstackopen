import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		updateAnecdote(state, action) {
			const updatedAnecdote = action.payload
			return state.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
		},
		appendAnecdote(state, action) {
			const newAnecdote = action.payload
			state.push(newAnecdote)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = (content) => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(appendAnecdote(newAnecdote))
	}
}

export const vote = (anecdote) => {
	return async dispatch => {
		const updatedAnecdote = await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
		dispatch(updateAnecdote(updatedAnecdote))
	}
}

export default anecdoteSlice.reducer