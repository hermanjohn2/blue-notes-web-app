import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Store from './utils/localStore';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const App = () => {
	const [user, setUser] = useState();

	useEffect(() => {
		const user = Store.get();
		setUser(user);
	}, [user]);

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					{!user ? (
						<Login setUser={setUser} />
					) : (
						<Dashboard user={user} setUser={setUser} />
					)}
				</Route>
				{/* <Route exact path="/login" component={Login} /> */}
			</Switch>
		</Router>
	);
};

export default App;
