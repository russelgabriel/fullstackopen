import { createSlice } from '@reduxjs/toolkit'

import blogService from '../../services/blogs'

const blogsSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload
		},
		addBlog(state, action) {
			return [...state, action.payload]
		},
		updateBlog(state, action) {
			return state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
		},
		removeBlog(state, action) {
			return state.filter(blog => blog.id !== action.payload)
		}
	}
})

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch(blogsSlice.actions.setBlogs(blogs))
	}
}

export const addBlog = (blog) => {
	return async dispatch => {
		const newBlog = await blogService.create({...blog, likes: 0, comments: []})
		dispatch(blogsSlice.actions.addBlog(newBlog))
	}
}

export const deleteBlog = (id) => {
	return async dispatch => {
		await blogService.remove(id)
		dispatch(blogsSlice.actions.removeBlog(id))
	}
}

export const likeBlog = (blog) => {
	return async dispatch => {
		const updatedBlogObject = {...blog, likes: blog.likes + 1}
		const updatedBlog = await blogService.update(blog.id, updatedBlogObject)
		dispatch(blogsSlice.actions.updateBlog(updatedBlog))
	}
}

export const addComment = (id, comment) => {
	return async dispatch => {
		await blogService.createComment(id, comment)
		const blogToUpdate = await blogService.getBlog(id)
		const updatedBlogObject = {...blogToUpdate }
		const updatedBlog = await blogService.update(id, updatedBlogObject)
		dispatch(blogsSlice.actions.updateBlog(updatedBlog))
	}
}

export default blogsSlice.reducer