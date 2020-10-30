import React, { useState } from 'react'
import Toggleable from './Toggleable'

const Blog = ({ blog }) => {
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
            likes: {blog.likes} <br/>
            {blog.user.username}
          </div> 
        }
      </div>
    </div>
  )
}

export default Blog