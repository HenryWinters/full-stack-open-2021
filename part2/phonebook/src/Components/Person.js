import axios from 'axios'
import personsService from '../services/personsService'

const Person = ({person, persons, setPersons}) => { 

    const deletePerson = (event) => {
        const result = window.confirm(`Delete ${person.name}?`)
        if (result) {
            personsService
                .deletePersonFromServer(person.id)
                setPersons(persons.filter(contact => contact.id !== person.id))
            }
        }

    return (  
        <div> 
            <li>{person.name} {person.number}</li>
            <button onClick={deletePerson}>Delete</button>
        </div>             
    )  
}

export default Person 