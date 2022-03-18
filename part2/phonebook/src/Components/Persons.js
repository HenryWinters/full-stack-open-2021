import Person from './Person'

const Persons = ({persons, newFilter, setPersons, setNotification}) => {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase()))

    let personDisplay= '';
    if (newFilter === '') {
      personDisplay = persons.map(person => <Person key={person.name} person={person} persons={persons} setPersons={setPersons} setNotification={setNotification}/> )
    } else {
      personDisplay = filteredPersons.map(person => <Person key={person.name} person={person} persons={persons} setPersons={setPersons} setNotification={setNotification}/> )
    }

    return (
      <ul>
        {personDisplay}
      </ul> 
    )
}

export default Persons