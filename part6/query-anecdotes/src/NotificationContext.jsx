/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return action.payload
		case 'CLEAR_NOTIFICATION':
			return ''
		default:
			return state
	}
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, '')

	return (
		<NotificationContext.Provider value={{ notification, notificationDispatch }}>
			{props.children}
		</NotificationContext.Provider>
	)
}

export const useNotificationValue = () => {
	const { notification } = useContext(NotificationContext)
	return notification
}

export const useNotificationDispatch = () => {
	const { notificationDispatch } = useContext(NotificationContext)
	return notificationDispatch
}

export default NotificationContext