import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification' // <-- ADDED
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null) // <-- ADDED
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const deleteBlog = async (id) => {
    if (window.confirm('Remove this blog?')) {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }
  }
  const updateLikes = async (blog) => {
    const updatedBlog = await blogService.update(blog.id, blog)

    setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)))
  }
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))

      setNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      )

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      setUser(user)

      // <-- ADDED
      setNotification(`Welcome ${user.name}`)

      // <-- ADDED
      setTimeout(() => {
        setNotification(null)
      }, 5000)

      setUsername('')
      setPassword('')
    } catch (exception) {
      // <-- CHANGED
      setNotification('wrong username or password')

      // <-- ADDED
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} /> {/* <-- ADDED */}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} /> {/* <-- ADDED */}
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            deleteBlog={deleteBlog}
            updateLikes={updateLikes}
          />
        ))}
    </div>
  )
}

export default App
