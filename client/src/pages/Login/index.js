import { useState } from 'react';
import { Card, Input, Button } from 'semantic-ui-react';
import './style.css';

const Login = () => {
	const [registered, setRegistered] = useState(true);

	return (
		<div className="login-container">
			{registered ? (
				<Card className="login-card" fluid>
					<h1>Blue Notes | Login</h1>
					<Input className="login-content" placeholder="Email" />
					<Input className="login-content" placeholder="Password" />
					<Button className="login-content">Login</Button>
					<br />
					<p>
						<span onClick={() => setRegistered(false)}>
							Not registered? Register here.
						</span>
					</p>
				</Card>
			) : (
				<Card className="login-card" fluid>
					<h1>Blue Notes | Register</h1>
					<Input className="login-content" placeholder="Your Name" />
					<Input className="login-content" placeholder="Business Name" />
					<Input className="login-content" placeholder="Email" />
					<Input className="login-content" placeholder="Verify Email" />
					<Input className="login-content" placeholder="Password" />
					<Input className="login-content" placeholder="Verify Password" />
					<Button className="login-content">Register</Button>
					<br />
					<span onClick={() => setRegistered(true)}>
						Already a user? Login here.
					</span>
				</Card>
			)}
		</div>
	);
};

export default Login;
