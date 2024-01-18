import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setNotification } from "./redux/reducers/notificationReducer";
import { initializeBlogs } from "./redux/reducers/blogsReducer";
import { setUser } from "./redux/reducers/userReducer";
import blogService from "./services/blogs";
import loginService from "./services/login";

import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Notification from "./components/Notification";

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON && loggedUserJSON !== "null") {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const loggedInUser = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      dispatch(setUser(loggedInUser))
      blogService.setToken(loggedInUser.token);
    } catch (error) {
			console.log(error)
			const notificationConfig = {
				message: 'Incorrect username or password',
				type: 'error',
				timeout: 5
			}
			dispatch(setNotification(notificationConfig))
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUser(null))
  };

  if (!user) {
    return (
      <div>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <Home
        user={user}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default App;
