const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('../tests/test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('test id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  await api
    .post('/api/blogs')
    .send(helper.newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  
  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain(helper.newBlog.title)
})

afterAll(() => {
  mongoose.connection.close()
})