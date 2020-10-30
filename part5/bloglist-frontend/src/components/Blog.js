import React, { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
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
          {visible ? 'hide' : 'view'}
        </button>
        {
          visible && 
          <div>
            {blog.url} <br/>
            likes: {blog.likes} 
            <button value={blog.id} onClick={handleLike}>
              like
            </button>
            <br/>
            {blog.user.name} <br/>
            {
              user.name === blog.user.name &&
              <button value={blog.id} onClick={handleDelete}>remove</button>
            }
          </div> 
        }
      </div>
    </div>
  )
}

export default Blog