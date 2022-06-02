const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body 

  const user = request.user

  const blog = new Blog({
    title: body.title, 
    author: body.author, 
    url: body.url, 
    likes: body.likes, 
    user: user._id
  })
 
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save() 
  response.status(201).json(savedBlog) 

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const user = request.user

  const blogToDelete = await Blog.findById(request.params.id)
  
  if (user.id === blogToDelete.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    const indexOfBlog = user.blogs.indexOf(request.params.id)
    if (indexOfBlog > -1) {
      user.blogs.splice(indexOfBlog, 1)
    }
    await user.save()

    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title, 
    author: body.author, 
    url: body.url, 
    likes: body.likes,
    user: body.user
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(blog)
})


module.exports = blogsRouter 