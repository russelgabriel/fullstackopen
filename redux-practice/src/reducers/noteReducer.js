import { createSlice } from '@reduxjs/toolkit'

import noteService from '../services/notes'

const generateId = () => {
	return Number((Math.random() * 1000000).toFixed(0))
}

const noteSlice = createSlice({
	name: 'notes',
	initialState: [],
	reducers: {
		toggleImportanceOf(state, action) {
			const toggledNote = action.payload

			return state.map(note =>
				note.id !== toggledNote.id ? note : toggledNote
			)
		},
		appendNote(state, action) {
			state.push(action.payload)
		},
		setNotes(state, action) {
			return action.payload
		}
	}
})

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

// Thunk combines async service call and action dispatch into one function
// Thunk is a function that wraps an expression to delay its evaluation
export const initializeNotes = () => {
	return async dispatch => {
		const notes = await noteService.getAll()
		dispatch(setNotes(notes))
	}
}

export const createNote = (content) => {
	return async dispatch => {
		const newNote = await noteService.createNew(content)
		dispatch(appendNote(newNote))
	}
}

export default noteSlice.reducer