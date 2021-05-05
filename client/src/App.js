import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path={['/', '/dashboard']} component={Dashboard} />
				<Route exact path="/login" component={Login} />
			</Switch>
		</Router>
	);
};

export default App;
