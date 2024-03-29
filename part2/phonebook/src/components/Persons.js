import React from 'react'
import Person from './Person'

const Persons = ({ persons, newFilter, removePerson }) => {
  const personsShow = newFilter
		? persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons.concat()
      
  return (
    personsShow
      .map(p => <Person key={p.id} person={p} removePerson={removePerson}/>)
  )
}

export default Persons