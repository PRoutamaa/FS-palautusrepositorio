import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import CountryDetails from './components/CountryDetails'
import CountryList from './components/CountryList'

function App() {
  const [countries, setCountries] = useState([])
  const [searchPattern, setSearchPattern] = useState(null)
  const [weather, setWeather] = useState('')

useEffect(() => {
  console.log(`effect run, countries shown now include ${searchPattern}`)

  if (searchPattern) {
    console.log('fetching country names...')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const filCountries = response.data.filter((country) => country.name.common.toLowerCase().includes(searchPattern.toLowerCase()))
        setCountries(filCountries)
        console.log(filCountries)

      })
  }
}, [searchPattern])

const nameHandler = (event) => {
  event.preventDefault()
  console.log(event.target.value)
  setSearchPattern(event.target.value)
}

const clickHandler = (country) => {
  console.log(`From clickhandler ${country}`)
  setCountries([country])
}

  return (
    <>
      <h1>Names of Countries</h1>
      <div>
        find countries<input 
        value={searchPattern}
        onChange={nameHandler}
        />
      </div>
      {countries.length <= 10 ? (
        countries.length === 1 ? (
          <CountryDetails 
          name={countries[0].name.common} 
          capital={countries[0].capital[0]} 
          area={countries[0].area} 
          languages={countries[0].languages} 
          flag={countries[0].flags}
          alt={countries[0].flag}
          lat={countries[0].latlng[0]}
          lon={countries[0].latlng[1]}
          weather={weather}
          setWeather={setWeather}
          />
        ) : (
      <div>
          {countries.map((country) => {
            return (<CountryList 
            key={country.name.common} 
            common={country.name.common} 
            clickHandler={() => clickHandler(country)} 
            />)
          }
          )}
      </div>
        )
      ) : (
        <p>Too many matches, please refine your search.</p>
      )}
      
    </>
  )
}

export default App
