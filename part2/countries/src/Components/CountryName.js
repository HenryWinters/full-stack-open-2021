import CountryDetails from './CountryDetails'
import { useEffect } from 'react'

const CountryName = ({country, setShow}) => { 


    const handleShowClick = (event) => {
        setShow([country])
    }

    return (
        <div>
            <p>{country.name.common}</p>
            <button onClick={handleShowClick}>show</button>
        </div> 
    )
}



export default CountryName 

