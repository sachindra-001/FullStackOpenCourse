const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    likes: 10,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    likes: 15,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const notesInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}
module.exports = {
  initialBlogs,
  nonExistingId,
  notesInDb,
}
