import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Confirm, Icon } from 'semantic-ui-react';
import API from '../../utils/API';
import './style.css';

import CustomMenu from '../../components/CustomMenu';
import CrudModal from '../../components/CrudModal';
import StatsContainer from '../../components/StatsContainer';

const Dashboard = props => {
	const { user, logout } = useAuth0();
	const [currentUser, setCurrentUser] = useState();
	const [config, setConfig] = useState();
	const [modal, setModal] = useState({
		show: false,
		data: {}
	});
	const [formObj, setFormObj] = useState();
	const [selectedJob, setSelectedJob] = useState();
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [confirmData, setConfirmData] = useState();

	const handleUser = () => {
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

	const customerName = (id, customerArr) =>
		customerArr.filter(customer => customer._id === id)[0].name;

	const confirmHandler = async data => {
		let updatedUser;
		try {
			if (Object.keys(data).includes('title')) {
				updatedUser = await API.deleteUserJob(currentUser, data);
			} else {
				updatedUser = await API.deleteUserCustomerData(currentUser, data);
			}
			setCurrentUser(updatedUser);
			setConfirmOpen(false);
		} catch (err) {
			console.log(err);
		}
	};

	const ConfirmContent = ({ isJob }) => {
		return (
			<div className="confirm-content">
				<Icon size="massive" name="exclamation circle" />
				{isJob ? (
					<>
						<h1>Are you sure you want to delete this job?</h1>
						<h2>You will lose all data associated with this job.</h2>
					</>
				) : (
					<>
						<h1>Are you sure you want to delete this customer?</h1>
						<h2>
							You will lose all data associated with this customer, including
							all jobs assigned to this customer.
						</h2>
					</>
				)}
			</div>
		);
	};

	useEffect(() => {
		handleUser();
		getConfig();
	});

	return config && currentUser ? (
		<>
			{config.name === 'default' ? (
				<>
					<CrudModal
						config={config}
						user={currentUser}
						setUser={setCurrentUser}
						modal={modal}
						setModal={setModal}
						formObj={formObj}
						setFormObj={setFormObj}
						customerName={customerName}
						selectedJob={selectedJob}
						setSelectedJob={setSelectedJob}
						setConfirmOpen={setConfirmOpen}
						setConfirmData={setConfirmData}
					/>
					{confirmData ? (
						<Confirm
							open={confirmOpen}
							content={
								<ConfirmContent
									isJob={Object.keys(confirmData).includes('title')}
								/>
							}
							onCancel={() => setConfirmOpen(false)}
							onClose={() => setConfirmOpen(false)}
							onConfirm={() => confirmHandler(confirmData)}
						/>
					) : null}

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
								<StatsContainer
									config={config}
									type="all"
									user={currentUser}
									modal={modal}
									setModal={setModal}
									formObj={formObj}
									setFormObj={setFormObj}
									customerName={customerName}
									selectedJob={selectedJob}
									setSelectedJob={setSelectedJob}
								/>
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
