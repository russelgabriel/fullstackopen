const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res, next) => {
	try {
		const notes = await Note.find({})
		res.json(notes)
	} catch (e) {
		next(e)
	}
})

notesRouter.get('/:id', async (req, res, next) => {
	try {
		const note = await Note.findById(req.params.id)
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

		if (body.content === undefined) {
			return res.status(400).json({
				error: 'content missing'
			})
		}

		const note = new Note({
			content: body.content,
			important: body.important || false
		})

		const savedNote = await note.save()
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