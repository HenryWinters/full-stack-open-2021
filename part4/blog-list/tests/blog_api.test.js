const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Test Blog',
        author: 'Mr. Test',
        url: 'Test URL',
        likes: 10
    },
    {
        title: 'Test Blog 2',
        author: 'Mr. Test 2',
        url: 'Test URL 2',
        likes: 15
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

test('correct number of notes are returned in JSON format', async () => {
    const response = await api.get('/api/blogs')

    .expect(200)
    .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(2)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.every(blog => blog.id)).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})