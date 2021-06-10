import axios from 'axios';
const url =
	!process.env.NODE_ENV || process.env.NODE_ENV === 'development'
		? 'http://localhost:8080'
		: 'Enter Production API URL here';

const API = {
	registerUser: data => axios.post(`${url}/api/users/register`, data),
	loginUser: data => axios.post(`${url}/api/auth/login`, data),
	getSession: () => axios.get(`${url}/api/auth/session`),
	updateSession: data => axios.put(`${url}/api/auth/session`, data),
	logout: () => axios.post(`${url}/api/auth/logout`)
};

export default API;
