import React, { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

const Blog = ({ blog }) => {

  const [view, setView] = useState(false)

  //notification messages
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  //show when view true
  const showWhenView = { display: view ? '': 'none'}

  const blogStyle= {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const newBlogwithLikeUpdated = {...blog, ...blog.likes += 1}
    try{
      const result = await blogService.update(blog.id, blog)
      if (result){
        setSuccessMessage(
          `Likes of blog with title ${result.title} has been updated`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
    }
    }catch(exception){
      setErrorMessage(
        `blog could not updated, , ${exception.message}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } 
   }

   const handleRemove = async () => {

     try{
       if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
          const result = await blogService.remove(blog.id)
          if(result === 204){
            setSuccessMessage(
              `blog with title '${blog.title}' has been deleted`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          }
       }
     }catch(exception){
      setErrorMessage(
        `blog with title '${blog.title}' could not be deleted, , ${exception.message}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
     }
   }
  
  return (
    <>
    <Notification errorMessage={errorMessage} successMessage={successMessage}/>
    <div style={blogStyle}>
      <div>
        <p>{blog.title}<button onClick={() => setView(!view)}>{view ? 'hide' : 'view'}</button></p>
        <div style={showWhenView}>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
          <p>{blog.author}</p>
          <button onClick={handleRemove}>remove</button>
        </div>
      </div>
    </div>
   </>
  )
}

export default Blog
