import React from 'react'
import Country from './Country'

const Countries = ({ countries, newFilter, handleShow }) => {

  const countriesShow = countries.filter(c => c.name.toLowerCase().includes(newFilter.toLowerCase()))

  if (countriesShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  
  if (countriesShow.length === 1) {
    return <Country country={countriesShow[0]} />
  }

  return (
    countriesShow.slice(0, 10).map(c => 
      <div key={c.name}>
        {c.name}
        <button value={c.name} onClick={handleShow}>show</button>
      </div>
    )
  )
}

export default Countries