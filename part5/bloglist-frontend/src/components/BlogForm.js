import React from 'react'

const BlogForm = (props) => (
  <form onSubmit={props.addBlog}>
    title:
    <input
      value={props.blogTitle}
      onChange={props.handleBlogTitle}
    /> <br/>
    author:
    <input
      value={props.blogAuthor}
      onChange={props.handleBlogAuthor}
    /> <br/>
    url:
    <input
      value={props.blogUrl}
      onChange={props.handleBlogUrl}
    /> <br/>
    <button type="submit">create</button>
  </form>   
)

export default BlogForm