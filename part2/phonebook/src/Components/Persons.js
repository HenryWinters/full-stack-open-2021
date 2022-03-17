import Person from './Person'

const Persons = ({persons, newFilter, setPersons}) => {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase()))

    let personDisplay= '';
    if (newFilter === '') {
      personDisplay = persons.map(person => <Person key={person.name} person={person} persons={persons} setPersons={setPersons}/> )
    } else {
      personDisplay = filteredPersons.map(person => <Person key={person.name} person={person} persons={persons} setPersons={setPersons}/> )
    }

    return (
      <ul>
        {personDisplay}
      </ul> 
    )
}

export default Persons