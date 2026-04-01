const assert = require('node:assert') // Use this instead of expect
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation fails if password is too short', async () => {
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: '12',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    // NATIVE NODE ASSERTION
    assert.match(
      result.body.error,
      /password must be at least 3 characters long/,
    )
  })

  test('creation fails if username is not unique', async () => {
    const newUser = {
      username: 'root', // Already exists from beforeEach
      name: 'Duplicate',
      password: 'password123',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    assert.match(result.body.error, /expected `username` to be unique/)
  })

  // Note: This test belongs in a blog test file, but here is the fix:
})

after(async () => {
  await mongoose.connection.close()
})
