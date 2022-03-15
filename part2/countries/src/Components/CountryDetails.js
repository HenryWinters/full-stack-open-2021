import CountryWeather from './CountryWeather'

const CountryDetails = ({country}) => { 
    const languageArr = Object.keys(country[0].languages); 

    return (
        <div>
            <h1>{country[0].name.common}</h1>
            <p>Capital: {country[0].capital[0]}</p>
            <p>Area: {country[0].area}</p> 
            <h3>Languages</h3>
            <ul>
                {languageArr.map((language, i) => {
                    return (
                        <li key={i}>{country[0].languages[language]}</li>
                    )
                })}
            </ul> 
            <img src={country[0].flags.png} alt='flag of country'></img>
            <CountryWeather country={country} />
        </div> 
    )
}

export default CountryDetails

