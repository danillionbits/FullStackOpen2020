import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      
      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map(l =>
          <li key={l.name}>
            {l.name}
          </li>
        )}
      </ul>
      <img src={country.flag} alt={country.name} width="150px"/>
      <Weather capital={country.capital} />
    </div>

  )

}

export default Country