const assert = require('node:assert')

const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
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

    expect(result.body.error).toContain(
      'password must be at least 3 characters long',
    )
  })

  test('creation fails if username is not unique', async () => {
    const newUser = {
      username: 'root',
      name: 'Duplicate',
      password: 'password123',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    expect(result.body.error).toContain('expected `username` to be unique')
  })
})
