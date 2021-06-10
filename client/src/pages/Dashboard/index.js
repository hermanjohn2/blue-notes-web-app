import API from '../../utils/API';
import Store from '../../utils/localStore';

const Dashboard = props => {
	// /api/auth/session
	const user = props.user;

	const handleLogout = () =>
		API.logout()
			.then(() => {
				Store.delete();
				props.setUser('');
				window.location.replace('/');
			})
			.catch(err => console.log(err));

	return (
		<div>
			<button onClick={() => handleLogout()}>logout</button>
			{user ? (
				<>
					<h1>DASHBOARD</h1>
					<p>{user}</p>
				</>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
};

export default Dashboard;
