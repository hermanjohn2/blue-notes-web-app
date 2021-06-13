import axios from 'axios';
const url =
	!process.env.NODE_ENV || process.env.NODE_ENV === 'development'
		? 'http://localhost:8080'
		: 'Enter Production API URL here';

const API = {
	getUser: id => axios.get(`${url}/api/users/${id}`),
	createUser: data => axios.post(`${url}/api/users`, data)
};

export default API;
