import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const duplicateName = persons.find(p => p.name === newName)
    const personObject = { name: newName, number: newNumber }

    if (duplicateName) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(duplicateName.id, personObject)
      } 
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(personObject))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const updatePerson = (id, person) => {
    personService
      .update(id, person)
      .then( returnedPerson => {
        const updatedPersons = persons.map(p => p.id !== id ? p : person);
        setPersons(updatedPersons);
      })
  }

  const removePerson = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(
          setPersons(persons.filter(p => p.id !== person.id))
        )
    }
  }

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleNewFilter = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        persons={persons} 
        newFilter={newFilter}
        handleNewFilter={handleNewFilter}
      />

      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        newFilter={newFilter} 
        removePerson={removePerson}
      />
    </div>
  )
}

export default App