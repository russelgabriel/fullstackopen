import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createNew = async (content) => {
	const response = await axios.post(baseUrl, { content, important: false })
	return response.data
}

const update = async (id, newObject) => {
	const response = await axios.put(`${baseUrl}/${id}`, newObject)
	return response.data
}

export default { getAll, createNew, update }