import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: "blog",
    title: "blog",
    user: "blog",
    url: "www.blog.com",
    likes: 3
}

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent(3)
})  

test('clicking show button', () => {
  const user = { 
    username:"root",
    id: "5f9aaa8c4b84bb1ec0612a2c",
    name: "Superuser"
  }
  
  const blog = {
    author: "tester",
    title: "testtitle ",
    user: user,
    url: "www.test.com",
    likes: 3
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(3)
})