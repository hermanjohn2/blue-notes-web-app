import axios from 'axios';
const url =
	!process.env.NODE_ENV || process.env.NODE_ENV === 'development'
		? 'http://localhost:8080'
		: 'Enter Production API URL here';

const API = {
	getConfig: name => axios.get(`${url}/api/config/${name}`),
	getUser: id => axios.get(`${url}/api/users/${id}/all-data`),
	createUser: data => axios.post(`${url}/api/users`, data),
	createUserCustomer: async (formObj, user) => {
		console.log(user);
		formObj.user = user._id;
		const newCustomer = await axios.post(`${url}/api/customers`, formObj);
		user.customers.push(newCustomer.data);
		return user;
	},
	createUserJob: async (formObj, user) => {
		if (formObj.customer === 0) {
			const customerObj = {
				user: user._id,
				name: `Customer: ${formObj.title}`
			};

			const newCustomer = await axios.post(`${url}/api/customers`, customerObj);
			user.customers.push(newCustomer.data);
			formObj.customer = newCustomer.data._id;
		}

		formObj.user = user._id;
		const newJob = await axios.post(`${url}/api/jobs`, formObj);
		user.jobs.push(newJob.data);
		return user;
	},
	editCustomer: (id, data) => axios.put(`${url}/api/customers/${id}`, data),
	editUserJob: async (formObj, user) => {
		if (formObj.customer === 0) {
			const custObj = {
				user: user._id,
				name: `Customer for ${formObj.title}`
			};
			const newCustomer = await API.createCustomer(custObj);
			user.customers.push(newCustomer.data);
			formObj.customer = newCustomer.data._id;
		}

		const jobUpdate = await axios.put(
			`${url}/api/jobs/${formObj._id}`,
			formObj
		);
		user.jobs = user.jobs.map(job => {
			if (job._id === jobUpdate.data._id) {
				for (const prop in formObj) {
					jobUpdate.data[prop] = formObj[prop];
				}
				return jobUpdate.data;
			} else return job;
		});
		return user;
	}
};

export default API;
