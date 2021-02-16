import React, { useState } from 'react'
import Notification from './Notification'

const BlogForm = ({ blogObject }) => {
  //states
  //blog attributes states
  const [title, setTitle ] = useState('')
  const [author, setAuthor ] = useState('')
  const [url, setUrl ] = useState('')

  //notification messages
  const [errorMessage, setErrorMessage] = useState()
  // eslint-disable-next-line no-unused-vars
  const [successMessage, setSuccessMessage] = useState()

  const handletitleChange = (event) =>
  {
    setTitle(event.target.value)
  }

  const handleauthorChange = (event) =>
  {
    setAuthor(event.target.value)
  }

  const handleurlChange = (event) =>
  {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    if(title.length === 0){
      setErrorMessage(
        'Title missing'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }else if(author.length === 0){
      setErrorMessage(
        'Author missing'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }else if(url.length === 0){
      setErrorMessage(
        'Url missing'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }else {
      blogObject({
        title: title,
        author: author,
        url: url
      })
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>

      <h2>create new</h2>
      <form onSubmit={addBlog}>
                title:
        <input
          value={title}
          onChange={handletitleChange}
          id='title'
        />

                author:
        <input
          value={author}
          id='author'
          onChange={handleauthorChange}/>
                url:
        <input
          value={url}
          id='url'
          onChange={handleurlChange}/>
        <button type="submit" id="create">create</button>
      </form>
    </>
  )
}

export default BlogForm