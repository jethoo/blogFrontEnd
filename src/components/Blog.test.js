import React from 'react'
import '@testing-library/jest-dom/extend-expect'
// eslint-disable-next-line no-unused-vars
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  let component
  const blog = {
    title: 'Testing Blog Component',
    url: 'www.blogtest.com',
    author: 'JB',
    likes: 5
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog}/>
    )
  })


  test('renders title only by default', () => {
  //const viewButton = component.getByText('view')
  //fireEvent.click(viewButton)
    const div = component.container.querySelector('.viewAfterClick')
    expect(div).toHaveStyle('display: none')
  })

  test('renders url,likes and author after button click', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const div = component.container.querySelector('.viewAfterClick')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking like button twice event-hanlder is called twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(blog.likes).toEqual(7)
  })

})
