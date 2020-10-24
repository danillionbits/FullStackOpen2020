const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0 
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 0;

  const reducer = (favorite, blog) => {
    return favorite.likes > blog.likes
      ? favorite
      : blog
  }

  const favorite = blogs.reduce(reducer)
  return ({
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0;

  const reducer = (op, {author}) => {
    op[author] = op[author] || 0
    op[author] += 1
    return op  
  }

  let listBlogs = blogs.reduce(reducer, {})
  let mostBlogs = Object.keys(listBlogs).sort((a,b)=> listBlogs[b] - listBlogs[a])[0]

  return ({
    author: mostBlogs,
    blogs: listBlogs[mostBlogs]
  })
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return 0;

  const reducer = (op, {author, likes}) => {
    op[author] = op[author] || 0
    op[author] += likes
    return op  
  }

  let listLikes = blogs.reduce(reducer, {})
  let mostLikes = Object.keys(listLikes).sort((a,b)=> listLikes[b] - listLikes[a])[0]

  return ({
    author: mostLikes,
    likes: listLikes[mostLikes]
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}