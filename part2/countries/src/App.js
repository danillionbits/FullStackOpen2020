import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleNewFilter = (event) => setNewFilter(event.target.value)


  return (
    <div>
      <Filter 
        newFilter={newFilter} 
        handleNewFilter={handleNewFilter}
      />
      <Countries 
        countries={countries}
        newFilter={newFilter}
      />
    </div>

  )

}

export default App;
