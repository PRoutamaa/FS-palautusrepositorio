
import { useState, useEffect } from 'react'
import phoneBookService from './services/persons'
import Allnumbers from './components/Allnumbers.jsx'
import FilterPhonebook from './components/FilterPhonebook.jsx'
import PersonForm from './components/PersonForm.jsx'
import Notification from './components/Notification.jsx'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterCondition, setFilterCondition] = useState('')
  const [message, setMessage] = useState(null)
  const [cond, setCond] = useState('message')


useEffect(() => {
  phoneBookService
  .retrieveAll()
  .then(initPerson => {
    setPersons(initPerson)
  })
}, [])

const addName = (event) => {
  event.preventDefault()
  const names = persons.find((person) => person.name === newName)
  console.log(names)

  if (names != undefined) {
    const confirmChange = window.confirm(
      `Name: ${newName} is already in the phonebook, replace the old number with new one?`
    )
    if (confirmChange) {
      const chosen = persons.find(n => n.name === newName)
      const nameObject = {
        ...chosen,
        number: newNumber
      }
      phoneBookService
      .updateNumber(nameObject)
      .then(updatedPerson => {
        setPersons(persons.map(n => n.id !== nameObject.id ? n : updatedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`${nameObject.name} phone number was changed`)
        console.log(message)
      })
      .catch(error => {
        setCond('error')
        setMessage(`Please note, ${nameObject.name} has already been deleted from the phonebook`)});
        setPersons(persons.filter(n => n.id !== nameObject.id))
    }
  } else {
  const nameObject = {
    name: newName,
    number: newNumber
  }
  phoneBookService
  .createNew(nameObject)
  .then(newPerson => {
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
    setMessage(`${nameObject.name} was added to the phonebook`)
  })
  console.log(persons)
}
setTimeout(() => {setMessage(null), setCond('message')}, 4000)
}

const handleNameChange = (event) => {
  event.preventDefault()
  console.log(event.target.value)
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  event.preventDefault()
  console.log(event.target.value)
  setNewNumber(event.target.value)
}

const handleFilter = (event) => {
  event.preventDefault()
  console.log(event.target.value)
  console.log(filterCondition)
  setFilterCondition(event.target.value)

}

const delHandler = (person) => {
  const confirmDelete = window.confirm(`Delete ${person.name}?`)
  if (confirmDelete) {
    phoneBookService.delPerson(person.id)
    .then( () => {
        setMessage(`${person.name} was deleted`)
        setPersons(persons.filter(n => n.id !== person.id))
        console.log(person.name)
    })
    .catch(error => {
      setCond('error')
      setPersons(persons.filter(n => n.id !== person.id))
      setMessage(
        `Please note, ${person.name} has already been deleted from the phonebook`
       )
    })
  }
 
  setTimeout(() => {setMessage(null), setCond('message')}, 4000)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} cond={cond}/>
      <FilterPhonebook filterCondition={filterCondition} handleFilter={handleFilter} />
      <h2>Add new person</h2>
      <PersonForm 
      addName={addName} 
      newName={newName} 
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
         {persons.filter((person) => person.name.toLowerCase().includes(filterCondition.toLowerCase())).map((person) => 
          <Allnumbers key={person.id} person={person} pressDelete={() => delHandler(person)}/>
        )} 
      </ul>
      
    </div>
  )

}

export default App