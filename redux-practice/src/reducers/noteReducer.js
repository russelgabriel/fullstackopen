import { createSlice } from '@reduxjs/toolkit'

const generateId = () => {
	return Number((Math.random() * 1000000).toFixed(0))
}

const noteSlice = createSlice({
	name: 'notes',
	initialState: [],
	reducers: {
		createNote(state, action) {
			const content = action.payload
			state.push(action.payload)
		},
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

export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer