import { useContext } from "react";
import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SET_NOTIFICATION":
			return action.payload;
		case "CLEAR_NOTIFICATION":
			return null;
		default:
			return state;
	}
}

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, null);

	return (
		<NotificationContext.Provider value={{ notification, notificationDispatch }}>
			{children}
		</NotificationContext.Provider>
	)
}

export const useNotificationValue = () => {
	const { notification } = useContext(NotificationContext);
	return notification
}

// This is a custom hook that allows us to dispatch async actions
export const useNotificationDispatch = () => {
	const { notificationDispatch } = useContext(NotificationContext);

	const asyncDispatch = (action) => {
		if (typeof action === 'function') {
			action(notificationDispatch)
		}
		notificationDispatch(action)
	}
	return asyncDispatch
}

export const setNotification = ({ message, type, timeout }) => {
	return (dispatch) => {
		dispatch({
			type: "SET_NOTIFICATION",
			payload: { message, type, timeout },
		});
		setTimeout(() => {
			dispatch({ type: "CLEAR_NOTIFICATION" });
		}, timeout * 1000);
	};
}

export default NotificationContext