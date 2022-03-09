
import CountryName from './CountryName'
import CountryDetails from './CountryDetails'

const CountryDisplay = ({countries, setCountries, search}) => { 

    let searchedCountries = countries.filter(country => country.name.common.includes(search))

    if (searchedCountries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else if (searchedCountries.length === 1) {
        return (
            <CountryDetails country={searchedCountries} /> 
        )
    } else 

    return (
        <div>
            {searchedCountries.map(country => { return (
                <CountryName country={country} key={country.name.common} />)})}
        </div> 
    )
}

export default CountryDisplay

