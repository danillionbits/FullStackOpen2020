import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
            likes: {blog.likes} 
            <button value={blog.id} onClick={handleLike}>
              like
            </button>
          </div> 
        }
      </div>
    </div>
  )
}

export default Blog