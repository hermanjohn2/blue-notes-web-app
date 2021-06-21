import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Grid } from 'semantic-ui-react';
import API from '../../utils/API';
import './style.css';

import CustomMenu from '../../components/CustomMenu';
import CrudModal from '../../components/CrudModal';
import StatsBox from '../../components/StatsCard';

const Dashboard = props => {
	const { user, logout } = useAuth0();
	const [currentUser, setCurrentUser] = useState();
	const [config, setConfig] = useState();
	const [modal, setModal] = useState({
		show: false,
		data: {}
	});

	const handleUser = () => {
		// console.log(currentUser);
		if (!currentUser) {
			API.getUser(user.sub)
				.then(res => setCurrentUser(res.data))
				.catch(err => {
					if (err) {
						const userObj = {
							_id: user.sub,
							alias: user.nickname
						};

						API.createUser(userObj)
							.then(res => setCurrentUser(res.data))
							.catch(err => console.log(err));
					}
				});
		}
	};

	const getConfig = () => {
		if (!config) {
			API.getConfig('default')
				.then(res => setConfig(res.data))
				.catch(err => console.log(err));
		}
	};

	useEffect(() => handleUser());
	useEffect(() => getConfig());

	return config && currentUser ? (
		<>
			{config.name === 'default' ? (
				<>
					<CrudModal
						user={currentUser}
						setUser={setCurrentUser}
						modal={modal}
						setModal={setModal}
					/>
					<Grid className="desktop-container" stackable columns={2}>
						<Grid.Row>
							<button
								onClick={() => logout({ returnTo: window.location.origin })}>
								Logout
							</button>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={4}>
								<CustomMenu config={config} modal={modal} setModal={setModal} />
							</Grid.Column>
							<Grid.Column width={8}>
								<StatsBox type="all" user={currentUser} />
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</>
			) : config.name === 'mobile' ? (
				<div>
					<h1>Mobile</h1>
				</div>
			) : null}
		</>
	) : null;
};

export default Dashboard;
