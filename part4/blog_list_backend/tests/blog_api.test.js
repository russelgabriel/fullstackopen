const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

describe('Blog API', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog objects have id property instead of _id', async () => {
    const response = await api.get('/api/blogs')
  
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
      expect(blog._id).not.toBeDefined()
    })
  })

  test('creating a new blog post', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://testblog.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogs = response.body

    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

    const savedBlog = blogs.find(blog => blog.title === newBlog.title)
    expect(savedBlog).toBeDefined()
    expect(savedBlog.author).toBe(newBlog.author)
    expect(savedBlog.url).toBe(newBlog.url)
    expect(savedBlog.likes).toBe(newBlog.likes)
  })

  test('missing likes property defaults to 0', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://testblog.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const savedBlog = response.body

    expect(savedBlog.likes).toBe(0)
  })

  test('missing title or url properties should return 400 Bad Request', async () => {
    const newBlog = {
      author: 'Test Author',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
  
})


afterAll(async () => {
  await mongoose.connection.close()
})