import { useState } from 'react'
import Person from './Components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  
  const addPerson = (event) => {
    event.preventDefault();
    const newNameObj = {name: newName}
    const hasDuplicateObj = persons.some(obj => areTheseObjectsEqual(newNameObj, obj))
    if (hasDuplicateObj) {
      alert (`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newNameObj))
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>  
          <Person key={person.name} person={person}/>
        )}  
      </ul> 
    </div>
  )
}

export default App
