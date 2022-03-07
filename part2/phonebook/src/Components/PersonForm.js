const PersonForm = ({persons, setPersons, newNumber, setNewNumber, newName, setNewName}) => { 

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

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
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