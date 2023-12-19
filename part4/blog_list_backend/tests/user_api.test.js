const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
	await User.deleteMany({})

	const userObjects = helper.initialUsers.map(async user => {
		await api
			.post('/api/users')
			.send(user)
	})

	await Promise.all(userObjects)
})

test('create valid user', async () => {
	const newUser = {
		username: 'testuser4',
		name: 'Test User',
		password: 'testpassword'
	}

	const response = await api
		.post('/api/users')
		.send(newUser)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	expect(response.body.username).toBe(newUser.username)
	expect(response.body.password).not.toBeDefined()
})

test('reject short username', async () => {
	const invalidUser = {
		username: 'te',
		name: 'Test User',
		password: 'testpassword'
	}

	const response = await api
		.post('/api/users')
		.send(invalidUser)
		.expect(400)
		.expect('Content-Type', /application\/json/)
})

test('reject short password', async () => {
	const invalidUser = {
		username: 'testuser4',
		name: 'Test User',
		password: 'a'
	}

	const response = await api
		.post('/api/users')
		.send(invalidUser)
		.expect(400)
		.expect('Content-Type', /application\/json/)
})

test('reject duplicate username', async () => {
	const duplicateUser = helper.initialUsers[0]
	
	const response = await api
	.post('/api/users')
	.send(duplicateUser)
	.expect(400)
	.expect('Content-Type', /application\/json/)
})



afterAll(async () => {
  await mongoose.connection.close()
})
