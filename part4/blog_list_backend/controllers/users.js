const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
	try {
		const users = await User
			.find({})
			.populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
		response.json(users)
	} catch (error) {
		next(error)
	}
})

usersRouter.get('/:id', async (request, response, next) => {
	try {
		const user = await User
			.findById(request.params.id)
			.populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
		if (user) {
			response.json(user)
		} else {
			response.status(404).end()
		}
	} catch (error) {
		next(error)
	}
})

usersRouter.post('/', async (request, response, next) => {
	const { username, name, password } = request.body

	if (!password || password.length < 3) {
		return response.status(400).json({
			error: 'password must be at least 3 characters long'
		})
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)
	try {
		const newUser = new User({
			username,
			name,
			password: passwordHash,
			blogs: []
		})
		const savedUser = await newUser.save()
		response.status(201).json(savedUser)
	} catch (error) {
		next(error)
	}
})

module.exports = usersRouter