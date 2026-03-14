const blogRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blog = await Blog.find({})
  response.json(blog)
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  try {
    const savedBlog = await blog.save()
    response.status(200).json(savedBlog)
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
