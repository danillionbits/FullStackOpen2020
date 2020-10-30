import React, { useState, useEffect, useRef } from 'react'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({ user, handleNoti }) => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const sortedBlogs = [...blogs].sort((a, b) => {
    return b.likes - a.likes
  })

  const addBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    
    const blog = await blogService.create(blogObject)
    const notification = {
      message: `a new blog ${blog.title} by ${blog.author} added`,
      error: true
    }

    fetchBlogs()
    handleNoti(notification)
  }

  const handleLike = async event => {
    event.preventDefault()
    const id = event.target.value
    const blog = blogs.find(blog => blog.id === id)
    
    const updatedBlog = {
      ...blog, 
      likes: blog.likes + 1, 
      user: blog.user.id
    }
    
    await blogService.update(id, updatedBlog)
    fetchBlogs()
  }

  const handleDelete = async event => {
    event.preventDefault()
    const id = event.target.value
    const blog = blogs.find(blog => blog.id === id)

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(id)
      fetchBlogs()
    }
  }

  return (
    <div>
      <Toggleable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Toggleable>
      
      {
        sortedBlogs.map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            user={user}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />)
      }
    </div>
  )
}

export default Blogs