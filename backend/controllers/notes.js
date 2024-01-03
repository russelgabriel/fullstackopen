const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

const getTokenFrom = (req) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}
	return null
}

notesRouter.get('/', async (req, res, next) => {
	try {
		const notes = await Note
			.find({})
			.populate('user', { username: 1, name: 1 })
		res.json(notes)
	} catch (e) {
		next(e)
	}
})

notesRouter.get('/:id', async (req, res, next) => {
	try {
		const note = await Note
			.findById(req.params.id)
			.populate('user', { username: 1, name: 1 })
		if (note) {
			res.json(note)
		} else {
			res.status(404).end()
		}
	} catch (error) {
		next(error)
	}
})

notesRouter.delete('/:id', async (req, res, next) => {
	try {
		await Note.findByIdAndDelete(req.params.id)
		res.status(204).end()
	} catch (error) {
		next(error)
	}
})

notesRouter.post('/', async (req, res, next) => {
	try {
		const body = req.body
		const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
		if (!decodedToken.id) {
			return res.status(401).json({
				error: 'token missing or invalid'
			})
		}

		const user = await User.findById(decodedToken.id)
		console.log('user', user)
		if (body.content === undefined) {
			return res.status(400).json({
				error: 'content missing'
			})
		}

		const note = new Note({
			content: body.content,
			important: body.important || false,
			user: user.id
		})

		const savedNote = await note.save()
		user.notes = user.notes.concat(savedNote._id)
		await user.save()
		res.status(201).json(savedNote)
	} catch (error) {
		next(error)
	}
})

notesRouter.put('/:id', async (req, res, next) => {
	try {
		const body = req.body

		const note = {
			content: body.content,
			important: body.important
		}

		// validators are run on update too
		const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, {
			new: true,
			runValidators: true,
			context: 'query'
		})
		res.json(updatedNote)
	} catch (error) {
		next(error)
	}
})

module.exports = notesRouter