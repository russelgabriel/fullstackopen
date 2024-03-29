import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";

import Blog from "../src/components/Blog";

describe("<Blog />", () => {
  let component;
	let store;
	let handleLikeBlog;
	let handleDeleteBlog;

  beforeEach(() => {
    const user = {
      username: "Test User",
    };

    const blog = {
      title: "Test title",
      author: "Test Author",
      url: "http://testurl.com",
      likes: 10,
      user: user,
    };

		const middlewares = [thunk];
		const mockStore = configureMockStore(middlewares);

		store = mockStore({
			blogs: [blog],
			user: user,
		});

		handleLikeBlog = jest.fn();
		handleDeleteBlog = jest.fn();

    component = render(
			<Provider store={store}>
				<Blog 
					blog={blog}
					user={user}
					handleLikeBlog={handleLikeBlog}
					handleDeleteBlog={handleDeleteBlog}
				/>,
			</Provider>
    );
  });

  test("renders title and author only", async () => {
    const { getByText, findByText, container } = component;

    expect(getByText("Test title")).toBeVisible();
    expect(getByText("Test Author")).toBeVisible();
    expect(getByText("http://testurl.com")).not.toBeVisible();
    expect(getByText("likes: 10")).not.toBeVisible();
  });

  test("renders url and likes when view button is clicked", async () => {
    const { container } = component;
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");

    await userEvent.click(viewButton);
    const url = await screen.findByText("http://testurl.com");
    const likes = await screen.findByText("likes: 10");

    expect(url).toBeVisible();
    expect(likes).toBeVisible();
  });

  test("like button is clicked twice", async () => {
    const { container } = component;
    const viewButton = screen.getByText("view");
    const likeButton = screen.getByText("like");

    fireEvent.click(viewButton);
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

		expect(handleLikeBlog.mock.calls).toHaveLength(2);

  });
});
