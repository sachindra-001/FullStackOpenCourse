const dummy = (blogs) => {
  // Even though 'blogs' is passed in, we ignore it for now
  return 1
}
const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const favorite = blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current
  })

  // Returning a simplified object as often requested in these exercises
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCount = {}
  blogs.forEach((blog) => {
    authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
  })
  const mostBlogsAuthor = Object.keys(authorCount).reduce((a, b) => {
    return authorCount[a] > authorCount[b] ? a : b
  })
  return {
    author: mostBlogsAuthor,
    blogs: authorCount[mostBlogsAuthor],
  }
}
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authorLikes = {}
  blogs.forEach((blog) => {
    authorLikes[blog.author] = (authorLikes[blog.author] || 0) + blog.likes
  })
  const mostLikesAuthor = Object.keys(authorLikes).reduce((a, b) => {
    return authorLikes[a] > authorLikes[b] ? a : b
  })
  return {
    author: mostLikesAuthor,
    likes: authorLikes[mostLikesAuthor],
  }
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
