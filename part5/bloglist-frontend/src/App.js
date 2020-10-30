import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [noti, setNoti] = useState({ message:'', error: false })
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const hanldeLogin = async userObject => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      const notification = {
        message: 'Wrong credentials',
        error: false
      }
      handleNoti(notification)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(blog => {
        const notification = {
          message: `a new blog ${blog.title} by ${blog.author} added`,
          error: true
        }
        setBlogs(blogs.concat(blog))
        handleNoti(notification)
      })
  }

  const handleNoti = notification => {
    setNoti(notification)
    setTimeout(() => {
      setNoti(null)
    }, 3000)
  }

  return (
    <div>
      <Notification {...noti}/>
      {user === null ?
        <LoginForm addUser={hanldeLogin}/> :
        <div>
          <h2>blogs</h2>
          {
            `${user.username} logged in`
          }
          <button onClick={handleLogout}>logout</button>
          <h2>create new</h2>
          <Toggleable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Toggleable>
          
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>  
      }
    </div>
  )
}

export default App