import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: 'blog',
    title: 'blog',
    user: 'blog',
    url: 'blog',
    likes: 3
}

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
})  