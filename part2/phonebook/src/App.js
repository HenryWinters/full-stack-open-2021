import { useState } from 'react'
import Person from './Components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '734-343-2333' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  
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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person =>  
          <Person key={person.name} person={person} />
        )}  
      </ul> 
    </div>
  )
}

export default App
