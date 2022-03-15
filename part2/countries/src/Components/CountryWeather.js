import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryWeather = ({country}) => {
    const api_key = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState({});
    const lat = country[0].capitalInfo.latlng[0];
    const lon = country[0].capitalInfo.latlng[1];

    useEffect(() => {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial`)
          .then(response => { 
            setWeather(response.data)
            
          })
    }, [country])

    if (Object.keys(weather).length) {

        return (
            <div> 
                <h2>Weather in {country[0].capital[0]}</h2>
                <p>Temperature: {weather.main.temp}°</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon'></img>
                <p>Wind: {weather.wind.speed}mph</p> 
            </div>
        )
    } else 
        return (
            <div>
                <h2>Weather in </h2>
                <p>Temperature: </p>
                <img src="" alt='weather icon'></img>
                <p>Wind: </p> 
            </div>
    )
    
}

export default CountryWeather