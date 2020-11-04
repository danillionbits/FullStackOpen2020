import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:
        <input
          value={title}
          id='title'
          onChange={({target}) => setTitle(target.value)}
        /> <br/>
        author:
        <input
          value={author}
          id='author'
          onChange={({target}) => setAuthor(target.value)}
        /> <br/>
        url:
        <input
          value={url}
          id='url'
          onChange={({target}) => setUrl(target.value)}
        /> <br/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm