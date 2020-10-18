const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  { 
   "name": "Arto Hellas", 
   "number": "040-123456",
   "id": 1
 },
 { 
   "name": "Ada Lovelace", 
   "number": "39-44-5323523",
   "id": 2
 },
 { 
   "name": "Dan Abramov", 
   "number": "12-43-234345",
   "id": 3
 },
 { 
   "name": "Mary Poppendieck", 
   "number": "39-23-6423122",
   "id": 4
 }
];

app.get('/info', (req, res) => {
  res.send(
    `Phonebook has info for ${persons.length} people
    <br/> <br/>
    ${new Date()}`
  )
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log(body)
  
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})