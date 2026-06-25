const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = (() => {
  try {
    return require('./controller/blog')
  } catch (e) {
    console.error('❌ FAILED TO LOAD BLOG ROUTER:', e.message)
    throw e
  }
})()
const loginRouter = require('./controller/login')

const usersRouter = require('./controller/user')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
console.log('BLOG ROUTER REGISTERED')
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(express.static('dist'))

module.exports = app
