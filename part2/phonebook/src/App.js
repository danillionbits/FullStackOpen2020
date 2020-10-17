import React, { useState } from 'react'

const Person = ({ person }) => (
  <p>{person.name}</p>
)

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const duplicateName = persons.find(p => p.name === newName)
    if(duplicateName) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = { name: newName }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map( person => <Person key={person.name} person={person} /> )
      }
    </div>
  )
}

export default App