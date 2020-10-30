import React, { useState, useEffect, useRef } from 'react'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ handleNoti }) => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  const sortedBlogs = [...blogs].sort((a, b) => {
    return a.likes - b.likes
  })

  console.log(sortedBlogs)

  useEffect(() => {
    const setInitialBlogs = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    setInitialBlogs()
  }, [])

  const addBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    
    const blog = await blogService.create(blogObject)
    const notification = {
      message: `a new blog ${blog.title} by ${blog.author} added`,
      error: true
    }

    setBlogs(blogs.concat(blog))
    handleNoti(notification)
  }

  const handleLike = async event => {
    event.preventDefault()
    const id = event.target.value
    const blog = blogs.find(blog => blog.id === id)
    
    const updatedBlog = {
      ...blog, 
      likes: blog.likes + 1, 
      user: blog.user ? blog.user.id : null
    }
    
    const returnedBlog = await blogService.update(id, updatedBlog)
    setBlogs(blogs.map(blog => (blog.id !== id ? blog : returnedBlog)))
  }

  return (
    <div>
      <Toggleable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Toggleable>
      
      {
        sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike}/>)
      }
    </div>
  )
}

export default Blogs