import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { initializeBlogs } from "./redux/reducers/blogsReducer";
import { setUser } from "./redux/reducers/userReducer";
import blogService from "./services/blogs";

import HomeView from "./views/HomeView";
import Notification from "./components/Notification";
import Header from "./components/Header";

import LoginView from "./views/LoginView";
import UsersView from "./views/UsersView";
import SingleUserView from "./views/SingleUserView";
import SingleBlogView from "./views/SingleBlogView";

const App = () => {
	const dispatch = useDispatch()

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

  return (
    <div>
			<Header />
      <Notification />

			<Routes>
				<Route path="/login" element={<LoginView />} />
				<Route path="/" element={<HomeView />} />
				<Route path="/users" element={<UsersView />} />
				<Route path="/users/:id" element={<SingleUserView />} />
				<Route path="/blogs/:id" element={<SingleBlogView />} />
			</Routes>
    </div>
  );


};

export default App;
