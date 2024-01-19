import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token

const setToken = newToken => {
	token = `Bearer ${newToken}`
}
const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = async (newBlog) => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

const update = async (newObject) => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
	return response.data
}

const remove = async (blog) => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
	return response.data
}

export default {
	getAll,
	setToken,
	create,
	update,
	remove
}

