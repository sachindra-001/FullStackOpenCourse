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
after(async () => {
  await mongoose.connection.close()
})
