import React from 'react'
import Person from './Person'

const Persons = ({ persons, newFilter }) => {
  const personsShow = newFilter
		? persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons.concat()
  
  console.log(personsShow)
    
  return (
    personsShow
      .map(p => <Person key={p.name} name={p.name} number={p.number}/>)
  )
}

export default Persons