const Allnumbers = ({person, pressDelete}) => {
    return(<li>
      {person.name} {person.number} <button onClick={pressDelete}>Delete</button>
      </li>)
  }

export default Allnumbers  