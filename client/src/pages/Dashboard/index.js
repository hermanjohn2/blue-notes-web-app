import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import API from '../../utils/API';

const Dashboard = props => {
	const { user, isLoading, logout } = useAuth0();
	const [currentUser, setCurrentUser] = useState();

	const handleUser = () => {
		if (!currentUser) {
			API.getUser(user.sub)
				.then(res => setCurrentUser(res.data))
				.catch(err => {
					if (err.response.status === 422) {
						const userObj = {
							_id: user.sub,
							alias: user.nickname
						};

						API.createUser(userObj)
							.then(res => setCurrentUser(res.data))
							.catch(err => console.log(err));
					} else console.log(err);
				});
		}
	};

	useEffect(() => handleUser());

	return isLoading ? (
		<div>
			<h1>LOADING...</h1>
		</div>
	) : (
		<div>
			<button onClick={() => logout({ returnTo: window.location.origin })}>
				Logout
			</button>

			{currentUser ? <p>{currentUser.alias}</p> : null}
		</div>
	);
};

export default Dashboard;
