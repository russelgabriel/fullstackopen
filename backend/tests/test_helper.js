const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
	{
		content: 'HTML is easy',
		important: false,
		user: '65806a1acaecebf027f3aebb'
	},
	{
		content: 'Browser can execute only JavaScript',
		important: true,
		user: '65806a1acaecebf027f3aebb'
	}
]

const initialUser = {
	'username': 'testuser',
	'name': 'Test User',
	'password': 'testpassword'
}

const nonExistingId = async () => {
	const note = new Note({ content: 'willremovethissoon' })
	await note.save()
	await note.deleteOne()

	return note._id.toString()
}

const notesInDb = async () => {
	const notes = await Note
		.find({})
		.populate('user', { username: 1, name: 1 })
	return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

module.exports = {
	initialNotes,
	initialUser,
	nonExistingId,
	notesInDb,
	usersInDb
}