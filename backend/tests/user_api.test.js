const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('User API', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('testpassword', 10)
		const user = new User({ username: 'testuser', passwordHash })

		await user.save()
	})

	test('should get all users', async () => {
		const response = await api
			.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(response.body).toHaveLength(1) // Assuming there is only one user in the database

		const usernames = response.body.map(u => u.username)
		expect(usernames).toContain('testuser')
	})

	test('should create a new user', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'newuser',
			name: 'New User',
			password: 'newpassword'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('should not create a new user with duplicate username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'testuser',
			name: 'Duplicate User',
			password: 'newpassword'
		}

		const response = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(response.body.error).toBe('username must be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
