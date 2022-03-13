
import CountryName from './CountryName'
import CountryDetails from './CountryDetails'
import { useEffect } from 'react'



const CountryDisplay = ({countries, search, show, setShow}) => { 

    const searchedCountries = countries.filter(country => country.name.common.toLowerCase().includes(search))
    
    useEffect(() => {
        setShow(searchedCountries)
    }, [search])

    if (show.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else if (show.length === 1) {
        return (
            <CountryDetails country={show} /> 
        )
    } else 

    return (
        <div>
            {show.map(country => { return (
                <CountryName country={country} key={country.name.common} show={show} setShow={setShow} />)})}
        </div> 
    )


}

export default CountryDisplay

