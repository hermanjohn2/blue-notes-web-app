import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Dashboard from './pages/Dashboard';

const App = () => {
	const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					{!isAuthenticated ? loginWithRedirect() : <Dashboard />}
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
