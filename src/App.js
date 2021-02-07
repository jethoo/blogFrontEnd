import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  //states
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [blogs, setBlogs] = useState([])

  //notification messages
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //run useEffect for every render to check if user is already logged In 
  //credentials stored in local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //loginForm
  const loginForm = () => (
    <>
    <h1>log in to application</h1>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>   
    </>   
  )
  
  const addBlog = (blogObject) => 
  {
    //instead of event receives blogObject
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        // if it's a success
        setSuccessMessage(
          `a new blog ${BlogForm.title} by ${BlogForm.author} added`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setBlogs(blogs.concat(returnedBlog))
      })
      // if backend rejects creating blog 
      .catch(error => {
        setErrorMessage(
          `Blog could not be added , ${error.message}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  
  //component for displaying blogs
  const blogComponent = () => {
    return (
      <div>
        <h2>blogs</h2>

        {user ? <><p>{user.name} logged in</p><button onClick={handleLogout}>logout</button></>: ''}

        <BlogForm />
        {console.log('blogs', blogs)}
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
       )}
      </div>
    )
  }

  //
  const handleLogout = () => {
   window.localStorage.clear()
   setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      setErrorMessage(' Wrong Username or password ')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  return (
    <div>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>

      { user ? blogComponent() : loginForm()}
    </div>
  )
}

export default App