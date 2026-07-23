import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
test('renders title and author, but not url or likes by default', () => {
  const blog = {
    title: 'React Testing',
    author: 'Sachindra',
    url: 'https://react.dev',
    likes: 15,
    user: {
      username: 'sachindra',
      name: 'Sachindra',
    },
  }

  render(
    <Blog
      blog={blog}
      user={blog.user}
      deleteBlog={() => {}}
      updateLikes={() => {}}
    />,
  )

  // Title and author should be visible
  expect(screen.getByText(/React Testing/i)).toBeDefined()
  expect(screen.getByText(/Sachindra/i)).toBeDefined()

  // URL should NOT be visible
  expect(screen.queryByText('https://react.dev')).toBeNull()

  // Likes should NOT be visible
  expect(screen.queryByText(/likes 15/i)).toBeNull()
})
test('shows the url and likes when the view button is clicked', async () => {
  const user = userEvent.setup()

  const blog = {
    title: 'React Testing',
    author: 'Sachindra',
    url: 'https://react.dev',
    likes: 15,
  }

  render(
    <Blog
      blog={blog}
      user={blog.user}
      deleteBlog={() => {}}
      updateLikes={() => {}}
    />,
  )

  // Click the "view" button
  const viewButton = screen.getByRole('button', { name: /view/i })
  await user.click(viewButton)

  // URL should now be visible
  expect(screen.getByText('https://react.dev')).toBeInTheDocument()

  // Likes should now be visible
  expect(screen.getByText(/likes 15/i)).toBeInTheDocument()
})
test('clicking the like button twice calls the event handler twice', async () => {
  const user = userEvent.setup()

  const updateLikes = vi.fn()

  const blog = {
    title: 'React Testing',
    author: 'Sachindra',
    url: 'https://react.dev',
    likes: 15,
    user: {
      username: 'sachindra',
      name: 'Sachindra',
    },
  }

  render(
    <Blog
      blog={blog}
      user={blog.user}
      deleteBlog={() => {}}
      updateLikes={updateLikes}
    />,
  )

  // First make the details visible
  const viewButton = screen.getByRole('button', { name: /view/i })
  await user.click(viewButton)

  // Find the Like button
  const likeButton = screen.getByRole('button', { name: /like/i })

  // Click it twice
  await user.click(likeButton)
  await user.click(likeButton)

  // The handler should have been called twice
  expect(updateLikes).toHaveBeenCalledTimes(2)
})
