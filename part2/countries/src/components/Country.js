import React from 'react'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      
      <h2>languages</h2>
      <ul>
        {country.languages.map(l =>
          <li key={l.name}>
            {l.name}
          </li>
        )}
      </ul>

      <img src={country.flag} alt={country.name} width="150px"/>
    </div>

  )

}

export default Country