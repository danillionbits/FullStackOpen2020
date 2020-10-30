import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [noti, setNoti] = useState({ message:'', error: false })
  

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
          <Blogs handleNoti={handleNoti}/>
        </div>  
      }
    </div>
  )
}

export default App