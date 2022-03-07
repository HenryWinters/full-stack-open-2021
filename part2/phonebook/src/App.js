import { useState } from 'react'
import Person from './Components/Person'
import Search from './Components/Search'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '734-343-2333' },
    { name: 'Peter Park', number: '432-234-6721'},
    { name: 'Tony Stark', number: '123-531-4674'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  
  const addPerson = (event) => {
    event.preventDefault();
    const newPersonObj = {name: newName, number: newNumber}
    const hasDuplicateObj = persons.some(obj => areTheseObjectsEqual(newPersonObj, obj))
    if (hasDuplicateObj) {
      alert (`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPersonObj))
    }
  }

  const areTheseObjectsEqual = (first, second) => {
    const al = Object.getOwnPropertyNames(first);
    const bl = Object.getOwnPropertyNames(second);
    if (al.length !== bl.length) return false; 
    const hasAllKeys = al.every(value => !!bl.find(v => v === value));
    if (!hasAllKeys) return false
    for (const key of al) if (first[key] !== second[key]) return false; 
    return true; 
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase()))

  let personDisplay= '';
  if (newFilter === '') {
    personDisplay = persons.map(person => <Person key={person.name} person={person} /> )
  } else {
    personDisplay = filteredPersons.map(person => <Person key={person.name} person={person} /> )
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Search newFilter={newFilter} setNewFilter={setNewFilter}/> 
      <h2>Add New</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />   
        </div> 
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personDisplay}
      </ul> 
    </div>
  )
}

export default App
