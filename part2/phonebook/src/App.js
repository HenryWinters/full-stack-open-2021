import { useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '734-343-2333' },
    { name: 'Peter Parker', number: '432-234-6721'},
    { name: 'Tony Stark', number: '123-531-4674'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/> 
      <h3>Add New</h3>
      <PersonForm persons={persons} setPersons={setPersons} newNumber={newNumber} setNewNumber={setNewNumber} newName={newName} setNewName={setNewName} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} /> 
    </div>
  )
}

export default App
