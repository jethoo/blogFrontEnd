import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> form calls event handler with right details', () => {
  //const createBlog = jest.fn()
  const blogObject = jest.fn()

  const component = render(
    <BlogForm blogObject={blogObject} />
  )
  component.debug()
  const title = component.container.querySelector('input')
  const author = component.container.querySelector('input:nth-child(1)')
  const url = component.container.querySelector('input:nth-child(2)')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Testing Form fullstackopen' }
  })
  fireEvent.change(author, {
    target: { value: 'JB' }
  })
  fireEvent.change(url, {
    target: { value: 'www.test.com' }
  })

  fireEvent.submit(form)

  //expect(createBlog.mock.calls).toHaveLength(1)
  console.log('blogObject', blogObject.mock)
  //expect(blogObject.mock.calls[0][0].title).toBe('Testing Form fullstackopen')
})