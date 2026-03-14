const assert = require('node:assert')

const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blog')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blog')
  console.log('Response Status:', response.status)
  console.log('Response Body:', response.body)
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})
test('blog posts have a unique identifier property named id', async () => {
  const response = await api.get('/api/blog')

  // ADD THIS LINE TO DEBUG:
  console.log(
    'Type of body:',
    typeof response.body,
    'Body content:',
    response.body,
  )

  response.body.forEach((blog) => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})
test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'fff.com',
    likes: 15,
  }

  await api
    .post('/api/blog')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.notesInDb()
  assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogAtEnd.map((n) => n.title)
  assert(titles.includes('First class tests'))
})
test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Sachindra',
    url: 'http://example.com',
  }

  const response = await api
    .post('/api/blog')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})
test.only('backend responds with 400 Bad Request if title or url are missing', async () => {
  const newBlog = {
    author: 'Robert C. Martin',
    likes: 15,
  }
  await api.post('/api/blog').send(newBlog).expect(400)
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test.only('succeeds with status code 204', async () => {
  const blogsAtStart = await helper.notesInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blog/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.notesInDb()

  const ids = blogsAtEnd.map((n) => n.id)
  assert(!ids.includes(blogToDelete.id))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('succeeds with status code 200 if id is valid', async () => {
  const blogsAtStart = await helper.notesInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlogData = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 1,
  }

  const response = await api
    .put(`/api/blog/${blogToUpdate.id}`)
    .send(updatedBlogData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
  const blogsAtEnd = await helper.notesInDb()
  const updatedBlogInDb = blogsAtEnd.find((b) => b.id === blogToUpdate.id)

  assert.strictEqual(updatedBlogInDb.likes, blogToUpdate.likes + 1)
})

after(async () => {
  await mongoose.connection.close()
})
