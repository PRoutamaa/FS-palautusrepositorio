import axios from 'axios'
import { useState, useEffect } from 'react'
import phoneBookService from './services/persons'

const Allnumbers = ({person, pressDelete}) => {
  return(<li>
    {person.name} {person.number} <button onClick={pressDelete}>Delete</button>
    </li>)
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
        <div>
          name: <input 
            value={props.newName}
            onChange={props.handleNameChange}
            />
        </div>
        <div>
          number: <input 
            value={props.newNumber} 
            onChange={props.handleNumberChange} /></div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
  )
}

const FilterPhonebook = ({filterCondition, handleFilter}) => 
<div>
  Filter phonebook with<input 
    value={filterCondition}
    onChange={handleFilter}/>
</div>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterCondition, setFilterCondition] = useState('')

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
      })
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
  })
  console.log(persons)
}}

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
    setPersons(persons.filter(n => n.id !== person.id))
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
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