import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const retrieveAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const createNew = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  
  const delPerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  }
  
  const updateNumber = (newObject) => {
    const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return request.then(response => response.data)
  }

  export default { 
    retrieveAll: retrieveAll, 
    createNew: createNew, 
    delPerson: delPerson,
    updateNumber: updateNumber
  }