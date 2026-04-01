const blogRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }
  const user = await User.findById(body.userId)
  if (!user) {
    return response.status(404).json({ error: 'user not found' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id, // Links the blog to the user
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})
blogRouter.delete('/:id', async (request, response, next) => {
  try {
    // 2. Use the correct Model (Blog instead of Note)
    await Blog.findByIdAndDelete(request.params.id)

    // 3. 204 No Content is the correct status for a successful deletion
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})
blogRouter.put('/:id', (request, response, next) => {
  const { author, title, url, likes } = request.body

  Blog.findById(request.params.id)
    .then((blog) => {
      if (!blog) {
        return response.status(404).end()
      }

      blog.author = author
      blog.title = title
      blog.url = url
      blog.likes = likes

      return blog.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch((error) => next(error))
})

module.exports = blogRouter
