import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		setNotification(state, action) {
			return action.payload
		},
		removeNotification(state, action) {
			return null
		}
	}
})

export const { removeNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
	return async dispatch => {
		dispatch(notificationSlice.actions.setNotification(message))
		setTimeout(() => {
			dispatch(notificationSlice.actions.removeNotification())
		}, timeout * 1000)
	}
}

export default notificationSlice.reducer