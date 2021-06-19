import { useAuth0 } from '@auth0/auth0-react';
import { Card, Button } from 'semantic-ui-react';
import './style.css';

const Landing = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<div className="login-container">
			<Card className="login-card" fluid>
				<Card.Header>
					<h1 className="login-content">Blue Notes</h1>
				</Card.Header>
				<br />
				<Button
					className="login-content"
					size="massive"
					onClick={() => loginWithRedirect()}>
					Login | Register
				</Button>
			</Card>
		</div>
	);
};

export default Landing;
