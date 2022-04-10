import personsService from '../services/personsService'

const PersonForm = ({persons, setPersons, newNumber, setNewNumber, newName, setNewName, setNotification}) => { 

    const addPerson = (event) => {
        event.preventDefault();
        const newPersonObj = {name: newName, number: newNumber}
        const isDuplicateName = persons.some(obj => areTheseNamesEqual(newPersonObj, obj))
        if (newPersonObj.name.length === 0) {
          setNotification({message: `Name is required`, type: 'error'})
          setTimeout(() => {
            setNotification({message: null, type: null})
          }, 5000)
        } else if (newPersonObj.number.length === 0) {
          setNotification({message: `Number is required`, type: 'error'})
          setTimeout(() => {
            setNotification({message: null, type: null})
          }, 5000)
        } else 
        if (isDuplicateName) {
          const result = window.confirm(`${newName} is already added to the phonebook. Would you like to replace the old number with the new one?`)
          if(result) {
            const duplicateNameArr = persons.filter(obj => obj.name === newName)
            const duplicateNameObj = duplicateNameArr[0]
            const duplicateNameID = duplicateNameObj.id 
            const updatedNumber = {...duplicateNameObj, number: newNumber} 
            
            personsService
              .updatePersonsPhoneNumber(duplicateNameID, updatedNumber)
              .then(updatedPerson => { 
                setPersons(persons.map(person => person.id !== duplicateNameID ? person : updatedPerson))
              })
              .catch(error => {
                setNotification({message: `Information of ${newName} has already been removed from server`, type: 'error'})
                personsService
                  .getPersonsFromServer()
                  .then(personsList => {
                  setPersons(personsList)
                })
              })

            setNotification({message: `Updated ${newName}'s phone number`, type: 'success'})
            setTimeout(() => {
              setNotification({message: null, type: null})
            }, 5000)
          }
        } else {
            personsService
              .addPersonToServer(newPersonObj)
              .then(newPerson => {
                setPersons(persons.concat(newPerson))
                setNewName('')
                setNewNumber('')
              }) 
              .catch(error => {
                setNotification({message: `${error}`, type: 'error'})
              })
            
            setNotification({message:`Added ${newName}`, type: 'success'})
            setTimeout(() => {
              setNotification({message: null, type: null})
            }, 5000)
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
      <div>
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
      </div> 
    )
}

export default PersonForm