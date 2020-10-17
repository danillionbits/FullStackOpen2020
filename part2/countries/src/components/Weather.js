import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [ weather, setWeather ] = useState('')
  const api_key = process.env.REACT_APP_API_KEY

	useEffect(() =>{
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(respone => {
        console.log('weather promise fulfilled')
        setWeather(respone.data)
      })
  }, [capital, api_key])

  
  if (!weather) {
		return <div></div>
	}

	return (
		<div>
			<h3>Weather in {capital}</h3>
			<p><b>temperature: </b> {weather.current.temperature} Celcius</p>
			<img src={weather.current.weather_icons} alt={weather.current.weather_descriptions} width="50px"/>
			<p><b>wind: </b> {weather.current.wind_kph} mph direction {weather.current.wind_dir}</p>
		</div>
	)

}

export default Weather