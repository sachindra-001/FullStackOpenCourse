import { useState } from 'react'

const Blog = ({ blog, deleteBlog, user, updateLikes }) => {
  const [visible, setVisible] = useState(false)

  const canDelete = blog.user && user && blog.user.username === user.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user,
    }

    updateLikes(updatedBlog)
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-title-author">
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {/* Hidden by default */}
      {visible && (
        <div className="blog-details">
          <div>{blog.url}</div>

          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>

          <div>{blog.user && blog.user.name}</div>

          {canDelete && (
            <button onClick={() => deleteBlog(blog.id)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
