import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ noti, setNoti ] = useState({ message:'', error: false })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const createPerson = (person) => {
    personService
      .create(person)
      .then(returnedPerson => {
        const notification = {
          message: `Added ${newName}`,
          error: true
        }
        setPersons(persons.concat(returnedPerson))
        handleNoti(notification)
      })
      .catch(error => {
        const notification = {
          message: error.response.data.error,
          error: false
        }
        handleNoti(notification)
      })
  }

  const updatePerson = (id, person) => {
    personService
      .update(id, person)
      .then( returnedPerson => {
        const updatedPersons = persons.map(p => p.id !== id ? p : returnedPerson);
        const notification = {
          message: `Added ${newName}`,
          error: true
        }
        setPersons(updatedPersons);
        handleNoti(notification)
      })
      .catch(error => {
        const notification = {
          message: `Information of ${newName} has already been removed from the server`,
          error: false
        }
        handleNoti(notification);
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

  const handleAdd = (event) => {
    event.preventDefault()

    const duplicateName = persons.find(p => p.name === newName)
    const person = { name: newName, number: newNumber }

    if (duplicateName) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        updatePerson(duplicateName.id, person)
    } else {
      createPerson(person)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleNewFilter = (event) => setNewFilter(event.target.value)
  const handleNoti = notification => {
    setNoti(notification)
    setTimeout(() => {
      setNoti(null)
    }, 3000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...noti} />

      <Filter 
        persons={persons} 
        newFilter={newFilter}
        handleNewFilter={handleNewFilter}
      />

      <h2>Add a new</h2>
      <PersonForm 
        handleAdd={handleAdd}
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