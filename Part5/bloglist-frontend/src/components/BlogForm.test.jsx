import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import BlogForm from './BlogForm'

test('calls the event handler with the right details when a new blog is created', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  // Get all three input fields
  const inputs = screen.getAllByRole('textbox')

  // Fill the form
  await user.type(inputs[0], 'React Testing')
  await user.type(inputs[1], 'Sachindra')
  await user.type(inputs[2], 'https://react.dev')

  // Submit the form
  const createButton = screen.getByRole('button', { name: /create/i })
  await user.click(createButton)

  // Event handler called once
  expect(createBlog).toHaveBeenCalledTimes(1)

  // Verify the object passed to createBlog
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'React Testing',
    author: 'Sachindra',
    url: 'https://react.dev',
    likes: 0,
  })
})
