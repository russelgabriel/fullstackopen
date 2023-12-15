const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
	try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  try {
    if (!blog.title || !blog.url) {
      return response.status(400).json({
        error: 'title or url missing'
      })
    }

    if (!blog.likes) {
      blog.likes = 0
    }
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter