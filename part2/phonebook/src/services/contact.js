import axios from 'axios'
const baseUrl = 'http://localhost:3001/contacts'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createContact = (newContact) => {
  const request = axios.post(baseUrl, newContact)
  return request.then(request => request.data)
}

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response)
}

const updateContact = (id, newContact) => {
  const request = axios.put(`${baseUrl}/${id}`, newContact)
  return request.then(response => response.data)
}

export default {
  getAll,
  createContact,
  deleteContact,
  updateContact
}