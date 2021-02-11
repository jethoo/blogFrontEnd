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

  //referencing three input fields of blogform
  const title = component.container.querySelector('input:nth-child(1)')
  const author = component.container.querySelector('input:nth-child(2)')
  const url = component.container.querySelector('input:nth-child(3)')
  const form = component.container.querySelector('form')

  //with the change event , supplying values to each input fields
  fireEvent.change(title, {
    target: { value: 'Testing Form fullstackopen' }
  })
  fireEvent.change(author, {
    target: { value: 'JB' }
  })
  fireEvent.change(url, {
    target: { value: 'www.test.com' }
  })
  //submitting the form
  fireEvent.submit(form)
  //expecting above supplied values to be rightly placed in the blog created
  expect(blogObject.mock.calls).toHaveLength(1)
  expect(blogObject.mock.calls[0][0].title).toBe('Testing Form fullstackopen')
  expect(blogObject.mock.calls[0][0].author).toBe('JB')
  expect(blogObject.mock.calls[0][0].url).toBe('www.test.com')
})