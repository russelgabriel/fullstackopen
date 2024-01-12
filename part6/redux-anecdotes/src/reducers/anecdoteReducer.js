import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		vote(state, action) {
			const newAnecdote = action.payload
			return state.map(anecdote => anecdote.id !== newAnecdote.id ? anecdote : newAnecdote)
		},
		createAnecdote(state, action) {
			const newAnecdote = action.payload
			state.push(newAnecdote)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})


export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer