import axios from 'axios';
const url =
	!process.env.NODE_ENV || process.env.NODE_ENV === 'development'
		? 'http://localhost:8080'
		: 'Enter Production API URL here';

const updateObjInArr = async (arr, obj, newObj) => {
	const updatedArr = arr.map(item => {
		if (item._id === obj.data._id) {
			for (const prop in newObj) {
				obj.data[prop] = newObj[prop];
			}
			return obj.data;
		} else return item;
	});
	return updatedArr;
};

const API = {
	getConfig: name => axios.get(`${url}/api/config/${name}`),
	getUser: id => axios.get(`${url}/api/users/${id}/all-data`),
	createUser: data => axios.post(`${url}/api/users`, data),
	createUserCustomer: async (formObj, user) => {
		formObj.user = user._id;
		const newCustomer = await axios.post(`${url}/api/customers`, formObj);
		user.customers.unshift(newCustomer.data);
		return user;
	},
	createUserJob: async (formObj, user) => {
		if (formObj.customer === 0) {
			const customerObj = {
				user: user._id,
				name: `Customer: ${formObj.title}`
			};

			const newCustomer = await axios.post(`${url}/api/customers`, customerObj);
			user.customers.unshift(newCustomer.data);
			formObj.customer = newCustomer.data._id;
		}

		formObj.user = user._id;
		const newJob = await axios.post(`${url}/api/jobs`, formObj);
		user.jobs.unshift(newJob.data);
		return user;
	},
	editUserCustomer: async (formObj, user) => {
		formObj.user = user._id;
		const customerUpdate = await axios.put(
			`${url}/api/customers/${formObj._id}`,
			formObj
		);

		user.customers = await updateObjInArr(
			user.customers,
			customerUpdate,
			formObj
		);
		return user;
	},
	editUserJob: async (formObj, user) => {
		if (formObj.customer === 0) {
			const custObj = {
				user: user._id,
				name: `Customer for ${formObj.title}`
			};
			const newCustomer = await API.createCustomer(custObj);
			user.customers.unshift(newCustomer.data);
			formObj.customer = newCustomer.data._id;
		}

		const jobUpdate = await axios.put(
			`${url}/api/jobs/${formObj._id}`,
			formObj
		);

		user.jobs = await updateObjInArr(user.jobs, jobUpdate, formObj);
		return user;
	},
	deleteUserJob: async (user, jobData) => {
		await axios.delete(`${url}/api/jobs/${jobData._id}`);

		user.jobs = user.jobs.filter(job => job._id !== jobData._id);
		user.customers = user.customers.map(customer => {
			if (customer._id === jobData.customer) {
				customer.jobs = customer.jobs.filter(job => job !== jobData._id);
			}
			return customer;
		});
		return user;
	},
	deleteUserCustomerData: async (user, customerData) => {
		const customerJobIds = user.jobs
			.filter(job => job.customer === customerData._id)
			.map(job => job._id);

		for await (const id of customerJobIds) {
			await axios.delete(`${url}/api/jobs/${id}`);
		}

		await axios.delete(`${url}/api/customers/${customerData._id}`);

		user.customers = user.customers.filter(
			customer => customer._id !== customerData._id
		);
		user.jobs = user.jobs.filter(job => job.customer !== customerData._id);
		return user;
	}
};

export default API;
