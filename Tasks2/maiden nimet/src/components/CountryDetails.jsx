import axios from "axios"
import { useEffect } from 'react'

const CountryDetails = (props) => {
  const api_key = import.meta.env.VITE_SOME_KEY
  console.log(props.lat)
  console.log(props.lon)
  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=${api_key}`)
    .then(response => {
      console.log(response.data)
      props.setWeather(response.data)})
    .catch(error => console.log("didn't get it"))
  }, [props.setWeather]) 

    return (
      <>
        <h2>{props.name}</h2>
        <div>
          <p>capital {props.capital}</p>
          <p>area {props.area}</p>
        </div>
        <h4>languages:</h4>
        <ul>
          {console.log(props.languages)}
          {Object.values(props.languages).map((language) => <li key={language}>{language}</li>)}
        </ul>
        <img src={Object.values(props.flag)[0]} alt={props.alt} />
     
      </>
    )
  }

export default CountryDetails  