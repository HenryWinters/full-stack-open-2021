import axios from 'axios'
import personsService from '../services/personsService'

const PersonForm = ({persons, setPersons, newNumber, setNewNumber, newName, setNewName}) => { 

    const addPerson = (event) => {
        event.preventDefault();
        const newPersonObj = {name: newName, number: newNumber}
        const hasDuplicateObj = persons.some(obj => areTheseNamesEqual(newPersonObj, obj))
        if (hasDuplicateObj) {
          alert (`${newName} is already added to phonebook`)
        } else {
            personsService
              .addPersonToServer(newPersonObj)
              .then(newPerson => {
                setPersons(persons.concat(newPerson))
                setNewName('')
                setNewNumber('')
              }) 
        }
      }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const areTheseNamesEqual = (first, second) => {
        return JSON.stringify(first.name) === JSON.stringify(second.name)
    }

    return (
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
    )
}

export default PersonForm