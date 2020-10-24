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
  const reducer = (favorite, blog) => {
    return favorite.likes > blog.likes
      ? favorite
      : blog
  }

  const favorite = blogs.reduce(reducer)
  return ({
    "title": favorite.title,
    "author": favorite.author,
    "likes": favorite.likes
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}