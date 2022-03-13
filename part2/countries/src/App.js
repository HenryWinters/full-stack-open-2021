import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './Components/Search'
import CountryDisplay from './Components/CountryDisplay'


function App() {

  const [search, setSearch] = useState(''); 
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div> 
      <Search search={search} setSearch={setSearch} />
      <CountryDisplay countries={countries} search={search} show={show} setShow={setShow} />
    </div>
  );
}




export default App;
