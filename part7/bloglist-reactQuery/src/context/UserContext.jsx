import { useContext } from "react";
import { createContext, useReducer } from "react";

const userReducer = (state, action) => {
	switch (action.type) {
		case "SET_USER":
			return action.payload;
		case "CLEAR_USER":
			return null;
		default:
			return state;
	}
}

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, userDispatch] = useReducer(userReducer, null);

	return (
		<UserContext.Provider value={{ user, userDispatch }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUserValue = () => {
	const { user } = useContext(UserContext);
	return user
}

export const useUserDispatch = () => {
	const { userDispatch } = useContext(UserContext);
	return userDispatch
}