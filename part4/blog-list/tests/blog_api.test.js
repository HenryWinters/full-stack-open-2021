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

test('a new valid blog can be added', async () => {
    const newBlog = {
        title: 'Test Blog 3',
        author: 'Mr Test 3',
        url: 'Test URL 3',
        likes: 20
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(
        'Test Blog 3'
    )
    
})

test('blog post with missing likes property will default likes to 0', async () => {
    const newBlog = {
        title: 'Missing Likes Test Blog',
        author: 'Mr Test 4',
        url: 'Test URL 4',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const newBlogInDB = response.body[response.body.length - 1]

    expect(newBlogInDB.likes).toBe(0)
})

test('blog post missing title and author will return 400 Bad Request', async () => {
    const newBlog = {
        url: 'Test URL 5',
        likes: 20
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('blog deletion will succeed and return code 204', async () => {
    const blogsAtStartJSON = await api.get('/api/blogs')
    const blogsAtStart = blogsAtStartJSON.body
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEndJSON = await api.get('/api/blogs')
    const blogsAtEnd = blogsAtEndJSON.body
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
})

test('blog modification will succeed', async () => {

    const blogsAtStartJSON = await api.get('/api/blogs')
    const blogsAtStart = blogsAtStartJSON.body
    const blogToModify = blogsAtStart[0]

    const modifiedBlog = {
        title: 'Test Blog',
        author: 'Mr. Test',
        url: 'Test URL',
        likes: 55
    }

    await api 
        .put(`/api/blogs/${blogToModify.id}`)
        .send(modifiedBlog)
    
    const blogsAfterPostJSON = await api.get('/api/blogs')
    const blogAfterModification = blogsAfterPostJSON.body[0]
    
    expect(blogAfterModification.likes).toBe(55)
})

afterAll(() => {
  mongoose.connection.close()
})