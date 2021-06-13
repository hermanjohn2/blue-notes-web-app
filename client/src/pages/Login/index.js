import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, Input, Button } from 'semantic-ui-react';
import './style.css';

import API from '../../utils/API';
import Store from '../../utils/localStore';

const Login = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<div className="login-container">
			<Card className="login-card" fluid>
				<h1>Blue Notes</h1>

				<br />
				<Button className="login-content" onClick={() => loginWithRedirect()}>
					Login | Register
				</Button>
			</Card>
		</div>
	);
};

export default Login;
