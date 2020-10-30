import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState({message: '', error: false})
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({
        message: 'Wrong credentials',
        error: false
      })
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async event => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    blogService
      .create(blogObject)
      .then(blog => {
        setErrorMessage({
          message: `a new blog ${blog.title} by ${blog.author} added`,
          error: true 
        })
        setBlogs(blogs.concat(blog))
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    
    console.log(`Adding blog ${blogTitle}`)

  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
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
    </div>      
  )

  return (
    <div>
      <Notification {...errorMessage}/>
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          {
            `${user.username} logged in`
          }
          <button onClick={handleLogout}>logout</button>
          <h2>create new</h2>
          <form onSubmit={addBlog}>
            title:
            <input
              value={blogTitle}
              onChange={({ target }) => setBlogTitle(target.value)}
            /> <br/>
            author:
            <input
              value={blogAuthor}
              onChange={({ target }) => setBlogAuthor(target.value)}
            /> <br/>
            url:
            <input
              value={blogUrl}
              onChange={({ target }) => setBlogUrl(target.value)}
            /> <br/>
            <button type="submit">create</button>
          </form>
          
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>  
      }
    </div>
  )
}

export default App