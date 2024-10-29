import { useState } from 'react'

const Allnumbers = ({person}) => {
  return(<li>{person.name} {person.number}</li>)
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterCondition, setFilterCondition] = useState('')

const addName = (event) => {
  event.preventDefault()
  const names = persons.find((person) => person.name === newName)
  console.log(names)

  if (names != undefined) {
    alert(`Name: ${newName} is already in the phonebook`)
  } else {
  const nameObject = {
    name: newName,
    number: newNumber
  }
  setPersons(persons.concat(nameObject))
  setNewName('')
  setNewNumber('')
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
          <Allnumbers key={person.name} person={person}/>
        )} 
      </ul>
      
    </div>
  )

}

export default App