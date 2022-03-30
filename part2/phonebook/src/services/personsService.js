import axios from 'axios'
const baseUrl = '/api/persons'

const getPersonsFromServer = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPersonToServer = (newPersonObj) => { 
    const request = axios.post(baseUrl, newPersonObj)
    return request.then(response => response.data)
}  

const deletePersonFromServer = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updatePersonsPhoneNumber = (id, newNumber) => {
    const request = axios.put(`${baseUrl}/${id}`, newNumber)
    return request.then(response => response.data)
}

export default { getPersonsFromServer, addPersonToServer, deletePersonFromServer, updatePersonsPhoneNumber }