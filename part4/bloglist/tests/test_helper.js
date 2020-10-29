const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [ 
  { 
    title: "React patterns", 
    author: "Michael Chan", 
    url: "https://reactpatterns.com/", 
    likes: 7, 
  }, 
  { 
    title: "Go To Statement Considered Harmful", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
    likes: 5, 
  }, 
  { 
    title: "Canonical string reduction", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
    likes: 12, 
  }, 
  { 
    title: "First class tests", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
    likes: 10, 
  }, 
  { 
    title: "TDD harms architecture", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    likes: 0, 
  }, 
  { 
    title: "Type wars", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
    likes: 2, 
  }
]

const initialUsers = [
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    passwordHash: '$2b$10$C8vLFHTQvco1CzkHQy9WAuQyp27G1Pb2j2OO5JirPe7BhLrVyMZ3G'
  },
  {
    username: 'root',
    name: 'Superuser',
    passwordHash: '$2b$10$yA39EoK9xiMO.EQ2ELDQyuRmMFLLAy315DW7m/wY5II8m724FffdS'
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'willremovethissoon',
    url: 'willremovethissoon',
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const tokenExtractor = async () => {
  const user = await User.findOne({ username: 'root' })
  const userForToken = {
    username: user.username,
    id: user.id,
  }
  return jwt.sign(userForToken, process.env.SECRET)
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
  tokenExtractor,
}