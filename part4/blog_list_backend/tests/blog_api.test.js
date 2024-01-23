const mongoose = require('mongoose')
const supertest = require('supertest').agent
const request = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const agent = supertest(app)


beforeAll(async () => {
	await helper.clearDatabase()

	const userObjects = helper.initialUsers.map(user => {
		return agent
			.post('/api/users')
			.send(user)
	})

	await Promise.all(userObjects)
})

beforeEach(async () => {
	await Blog.deleteMany({})

	const mainUser = await User.findOne({ username: helper.initialUsers[0].username })

	const blogObjects = helper.initialBlogs
		.map(blog => {
			blog.user = mainUser._id
			return new Blog(blog)
		})

	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

describe('GET requests', () => {
	beforeAll(async () => {
		await Blog.deleteMany({})

		const mainUser = await User.findOne({ username: helper.initialUsers[0].username })

		const blogObjects = helper.initialBlogs
			.map(blog => {
				blog.user = mainUser._id
				return new Blog(blog)
			})

		const promiseArray = blogObjects.map(blog => blog.save())
		await Promise.all(promiseArray)
	})

	test('blogs are returned as json', async () => {
		await agent
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await agent.get('/api/blogs')

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('blog objects have id property instead of _id', async () => {
		const response = await agent.get('/api/blogs')

		response.body.forEach(blog => {
			expect(blog.id).toBeDefined()
			expect(blog._id).not.toBeDefined()
		})
	})

	test('blog objects have none empty user property', async () => {
		const response = await agent.get('/api/blogs')

		response.body.forEach(blog => {
			expect(blog.user).toBeDefined()
			expect(blog.user).not.toBeNull()
		})
	})

	test('a GET request does not mutate a blog', async () => {
		const responseBefore = await agent.get('/api/blogs')
		const blogToTest = responseBefore.body[0]

		await agent.get(`/api/blogs/${blogToTest.id}`)

		const responseAfter = await agent.get('/api/blogs')
		const updatedBlog = responseAfter.body.find(blog => blog.id === blogToTest.id)

		expect(updatedBlog).toEqual(blogToTest)
	})
})

describe('POST requests', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})

		const mainUser = await User.findOne({ username: helper.initialUsers[0].username })

		const blogObjects = helper.initialBlogs
			.map(blog => {
				blog.user = mainUser._id
				return new Blog(blog)
			})

		const promiseArray = blogObjects.map(blog => blog.save())
		await Promise.all(promiseArray)

		const user = helper.initialUsers[0]

		const loginResponse = await agent
			.post('/api/login')
			.send({ username: user.username, password: user.password })

		// Store the login token for subsequent requests
		const token = loginResponse.body.token

		agent.auth(token, { type: 'bearer' })
	})

	test('creating a new blog post', async () => {
		const newBlog = {
			title: 'Test Blog',
			author: 'Test Author',
			url: 'https://testblog.com',
			likes: 10
		}

		await agent
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const response = await agent.get('/api/blogs')
		const blogs = response.body

		expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

		const savedBlog = blogs.find(blog => blog.title === newBlog.title)
		expect(savedBlog).toBeDefined()
		expect(savedBlog.author).toBe(newBlog.author)
		expect(savedBlog.url).toBe(newBlog.url)
		expect(savedBlog.likes).toBe(newBlog.likes)
		expect(savedBlog.user.username).toBe(helper.initialUsers[0].username)
	})

	test('missing likes property defaults to 0', async () => {
		const newBlog = {
			title: 'Test Blog',
			author: 'Test Author',
			url: 'https://testblog.com'
		}

		const response = await agent
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const savedBlog = response.body

		expect(savedBlog.likes).toBe(0)
	})

	test('missing comments property defaults to []', async () => {
		const newBlog = {
			title: 'Test Blog',
			author: 'Test Author',
			url: 'https://testblog.com',
		}

		const response = await agent
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const savedBlog = response.body

		expect(savedBlog.comments).toEqual([])
	})

	test('missing title or url properties should return 400 Bad Request', async () => {
		const newBlog = {
			author: 'Test Author',
			likes: 10
		}

		await agent
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	})

	test('POST request with no token responds with status code 401', async () => {
		const newBlog = {
			title: 'Test Blog',
			author: 'Test Author',
			url: 'https://testblog.com',
			likes: 10
		}

		// Clear the token from the agent
		await request(app)
			.post('/api/blogs')
			.send(newBlog)
			.expect(401)
	})

	test('creating a comment for a blog post', async () => {
		const blogsBeforeComment = await helper.blogsInDb()
		const blogToComment = blogsBeforeComment[0]
		const comment = {
			content: 'This is a comment'
		}

		await agent
			.post(`/api/blogs/${blogToComment.id}/comments`)
			.send(comment)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAfterComment = await helper.blogsInDb()
		const updatedBlog = blogsAfterComment.find(blog => blog.id === blogToComment.id)

		expect(updatedBlog.comments).toHaveLength(blogToComment.comments.length + 1)
	})
})

describe('DELETE requests', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})

		const mainUser = await User.findOne({ username: helper.initialUsers[0].username })

		const blogObjects = helper.initialBlogs
			.map(blog => {
				blog.user = mainUser._id
				return new Blog(blog)
			})

		const promiseArray = blogObjects.map(blog => blog.save())
		await Promise.all(promiseArray)

		const user = helper.initialUsers[0]

		const loginResponse = await agent
			.post('/api/login')
			.send({ username: user.username, password: user.password })

		// Store the login token for subsequent requests
		const token = loginResponse.body.token
		agent.auth(token, { type: 'bearer' })
	})

	test('deleting a single blog post', async () => {
		const blogsBeforeDelete = await helper.blogsInDb()
		const blogToDelete = blogsBeforeDelete[0]

		await agent
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAfterDelete = await helper.blogsInDb()
		const titles = blogsAfterDelete.map(blog => blog.title)

		expect(titles).not.toContain(blogToDelete.title)
		expect(blogsAfterDelete).toHaveLength(blogsBeforeDelete.length - 1)
	})

	test('deleting a non-existent blog post', async () => {
		const nonExistentId = await helper.nonExistingId()

		await agent
			.delete(`/api/blogs/${nonExistentId}`)
			.expect(404)
	})
})

describe('PUT requests', () => {
	test('updating the number of likes for a blog post', async () => {
		const blogsBeforeUpdate = await helper.blogsInDb()
		const blogToUpdate = blogsBeforeUpdate[0]
		const updatedLikes = blogToUpdate.likes + 1

		const updatedBlog = {
			...blogToUpdate,
			likes: updatedLikes
		}

		await agent
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAfterUpdate = await helper.blogsInDb()
		const updatedBlogInDb = blogsAfterUpdate.find(blog => blog.id === blogToUpdate.id)

		expect(updatedBlogInDb.likes).toBe(updatedLikes)
	})

	test('updating a non-existent blog post', async () => {
		const nonExistentId = await helper.nonExistingId()

		const updatedBlog = {
			title: 'Updated Blog',
			author: 'Updated Author',
			url: 'https://updatedblog.com',
			likes: 5
		}

		await agent
			.put(`/api/blogs/${nonExistentId}`)
			.send(updatedBlog)
			.expect(404)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})