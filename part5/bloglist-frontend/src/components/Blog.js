import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = event => {
    event.preventDefault()
    const blogObject = {...blog, likes: likes + 1}
    blogService
      .update(blog.id, blogObject)
      .then(updatedBlog => {
        console.log(updatedBlog)
        setLikes(likes+1)
      })
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>
          view
        </button>
        {
          visible && 
          <div>
            {blog.url} <br/>
            likes: {likes} 
            <button onClick={handleLike}>
              like
            </button>
            <br/>
            {blog.user ? blog.user.username : null}
          </div> 
        }
      </div>
    </div>
  )
}

export default Blog