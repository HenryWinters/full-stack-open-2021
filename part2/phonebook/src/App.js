import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personsService from './services/personsService'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({message: null, type: null})

  useEffect(() => {
    personsService
      .getPersonsFromServer()
      .then(personsList => {
        setPersons(personsList)
      })
  }, []); 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} /> 
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/> 
      <h3>Add New</h3>
      <PersonForm persons={persons} setPersons={setPersons} newNumber={newNumber} setNewNumber={setNewNumber} newName={newName} setNewName={setNewName} setNotification={setNotification}/>
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} setPersons={setPersons} setNotification={setNotification}/> 
    </div>
  )
}

export default App
