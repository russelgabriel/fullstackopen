import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getBlog = async (id) => {
	const response = await axios.get(`${baseUrl}/${id}`);
	return response.data;
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const createComment = async (id, comment) => {
	const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
	return response.data;
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default {
  getAll,
	getBlog,
  setToken,
  create,
	createComment,
  update,
  remove,
};
