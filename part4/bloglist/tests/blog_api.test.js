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

// GET request
describe('getting blogs', () => {
  test('getting all blogs as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('getting all blogs length', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
  
  test('getting blog id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

// POST request
describe('posting blog', () => {
  test('adding a valid blog', async () => {
    const newBlog = {
      title: "The Alchemist",
      author: "Paulo Coelho",
      url: "http://thealchemist.com/",
      likes: 13,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(newBlog.title)
  })
  
  test('adding blog with default likes', async () => {
    const newBlog = {
      title: "The Alchemist",
      author: "Paulo Coelho",
      url: "http://thealchemist.com/",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
  })
  
  test('adding blog without title and url', async () => {
    const newBlog = {
      author: "Paulo Coelho",
      likes: 13,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })  
})

afterAll(() => {
  mongoose.connection.close()
})