import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Grid } from 'semantic-ui-react';
import API from '../../utils/API';

import CustomMenu from '../../components/CustomMenu';

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
			<Grid stackable columns="equal">
				<Grid.Row stretched>
					<button onClick={() => logout({ returnTo: window.location.origin })}>
						Logout
					</button>
				</Grid.Row>
				{currentUser ? (
					<Grid.Row stretched>
						<Grid.Column>
							<CustomMenu />
						</Grid.Column>
						<Grid.Column>
							<div className="dash-stats">
								<h1>Stats?</h1>
							</div>
						</Grid.Column>
					</Grid.Row>
				) : null}
			</Grid>
		</div>
	);
};

export default Dashboard;
