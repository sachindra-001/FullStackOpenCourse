const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
app.get('/test', (req, res) => {
  res.send('working')
})

// register unknown endpoint and error handler after all routes
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
