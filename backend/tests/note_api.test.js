const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Note = require('../models/note')

const api = supertest(app)

describe('Note API', () => {
	beforeEach(async () => {
		await Note.deleteMany({})

		const noteObjects = helper.initialNotes
			.map(note => new Note(note))

		const promiseArray = noteObjects.map(note => note.save())
		await Promise.all(promiseArray)
	}, 100000)

	test('notes are returned as json', async () => {
		await api
			.get('/api/notes')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all notes are returned', async () => {
		const response = await api.get('/api/notes')

		expect(response.body).toHaveLength(helper.initialNotes.length)
	})

	test('a specific note is within the returned notes', async () => {
		const response = await api.get('/api/notes')

		const contents = response.body.map(r => r.content)
		expect(contents).toContain(
			'Browser can execute only JavaScript'
		)
	})

	test('a valid note can be added', async () => {
		const newNote = {
			content: 'async/await simplifies making async calls',
			important: true
		}

		await api
			.post('/api/notes')
			.send(newNote)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/notes')
		const contents = response.body.map(r => r.content)
		expect(response.body).toHaveLength(helper.initialNotes.length + 1)
		expect(contents).toContain('async/await simplifies making async calls')
	})

	test('a note without content is not added', async () => {
		const newNote = {
			important: true
		}

		await api
			.post('/api/notes')
			.send(newNote)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const notesAtEnd = await helper.notesInDb()

		expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
	})

	test('fetching a specific note', async () => {
		const notes = await helper.notesInDb()
		const noteToFetch = notes[0]

		const resultNote = await api
			.get(`/api/notes/${noteToFetch.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(resultNote.body).toEqual(noteToFetch)
	})

	test('deleting a note', async () => {
		const notes = await helper.notesInDb()
		const noteToDelete = notes[0]

		await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

		const notesAtEnd = await helper.notesInDb()

		expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
		expect(notesAtEnd.map(n => n.id)).not.toContain(noteToDelete.id)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})