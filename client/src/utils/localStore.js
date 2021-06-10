const Storage = {
	get: () => localStorage.getItem('bn_user'),
	post: data => localStorage.setItem('bn_user', data),
	delete: () => localStorage.removeItem('bn_user')
};

export default Storage;
