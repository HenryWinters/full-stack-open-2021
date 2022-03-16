import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPersonsFromServer = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPersonToServer = (newPersonObj) => { 
    const request = axios.post(baseUrl, newPersonObj)
    return request.then(response => response.data)
}  

export default { getPersonsFromServer, addPersonToServer }