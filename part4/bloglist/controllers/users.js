const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const isInvalidPassword = password => !password || password.length < 3

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.password || body.password.length < 3) {
    res.status(400).json({
      error: 'Password must be 3 characters long.'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser.toJSON())
})

module.exports = usersRouter