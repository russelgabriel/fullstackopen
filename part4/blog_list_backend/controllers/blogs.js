const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response, next) => {
	try {
		const blogs = await Blog
			.find({})
			.populate('user', { username: 1, name: 1, id: 1 })
		response.json(blogs)
	} catch (error) {
		next(error)
	}
})

blogsRouter.get('/:id', async (request, response, next) => {
	try {
		const blog = await Blog
			.findById(request.params.id)
			.populate('user', { username: 1, name: 1, id: 1 })
			.populate('comments', { content: 1, id: 1 })
		if (blog) {
			response.json(blog)
		} else {
			response.status(404).end()
		}
	} catch (error) {
		next(error)
	}
})

blogsRouter.post('/', async (request, response, next) => {
	try {
		const blog = new Blog(request.body)

		if (!request.token) {
			return response.status(401).json({
				error: 'token missing or invalid'
			})
		}

		if (!request.user) {
			return response.status(401).json({
				error: 'user not found'
			})
		}

		if (!blog.title || !blog.url) {
			return response.status(400).json({
				error: 'title or url missing'
			})
		}

		if (!blog.likes) {
			blog.likes = 0
		}

		if (!blog.comments) {
			blog.comments = []
		}

		const user = await User.findById(request.user)
		blog.user = user
		const savedBlog = await blog.save()

		// Fetch a fresh copy of the user document from the database
		const freshUser = await User.findById(user._id)
		freshUser.blogs = freshUser.blogs.concat(savedBlog._id)
		await freshUser.save()

		response.status(201).json(savedBlog)
	} catch (error) {
		next(error)
	}
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
	try {
		const comment = new Comment(request.body)
		const blog = await Blog.findById(request.params.id)
		comment.blog = blog
		const savedComment = await comment.save()

		const freshBlog = await Blog.findById(blog._id)
		freshBlog.comments = freshBlog.comments.concat(savedComment._id)
		await freshBlog.save()

		response.status(201).json(savedComment)
	} catch (error) {
		next(error)
	}
})

blogsRouter.delete('/:id', async (request, response, next) => {
	try {
		if (!request.token) {
			return response.status(401).json({
				error: 'token missing or invalid'
			})
		}

		if (!request.user) {
			return response.status(401).json({
				error: 'user not found'
			})
		}

		const user = request.user


		const blogToDelete = await Blog.findById(request.params.id)
		if (!blogToDelete) {
			return response.status(404).json({
				error: 'Blog not found'
			})
		}

		if (blogToDelete.user.toString() !== user.toString()) {
			return response.status(401).json({
				error: 'unauthorized user'
			})
		}

		const deletedBlog = await Blog.deleteOne(blogToDelete)
		if (!deletedBlog) {
			return response.status(404).json({
				error: 'Blog not found'
			})
		}
		response.status(204).end()
	} catch (error) {
		next(error)
	}
})

blogsRouter.put('/:id', async (request, response, next) => {
	try {
		const blogData = request.body
		if (blogData.user && typeof blogData.user === 'object' && blogData.user.id) {
			blogData.user = blogData.user.id
		}

		if (blogData.comments && Array.isArray(blogData.comments)) {
			for (let idx = 0; idx < blogData.comments.length; idx++) {
				if (blogData.comments[idx] && typeof blogData.comments[idx] === 'object' && blogData.comments[idx].id) {
					blogData.comments[idx] = blogData.comments[idx].id
				}
			}
		}

		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
			.populate('user', { username: 1, name: 1, id: 1 })
			.populate('comments', { content: 1, id: 1 })
		if (!updatedBlog) {
			return response.status(404).json({
				error: 'Blog not found'
			})
		}
		response.json(updatedBlog)
	} catch (error) {
		next(error)
	}
})

module.exports = blogsRouter