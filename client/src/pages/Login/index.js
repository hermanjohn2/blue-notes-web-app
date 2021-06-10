import { useState } from 'react';
import { Card, Input, Button } from 'semantic-ui-react';
import './style.css';

import API from '../../utils/API';
import Store from '../../utils/localStore';

const Login = props => {
	const [registered, setRegistered] = useState(true);
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [registerName, setRegisterName] = useState('');
	const [company, setCompany] = useState('');
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerEmailConfirm, setRegisterEmailConfirm] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');

	const handlers = {
		login: () => {
			if (!loginEmail || !loginPassword) {
				console.log('Please fill out the entire form.');
				return;
			}

			const bodyObj = {
				email: loginEmail,
				password: loginPassword
			};

			API.loginUser(bodyObj)
				.then(res => {
					props.setUser(res.data._id);
					Store.post(res.data._id);
				})
				.catch(err => console.log(err));
		},
		register: () => {
			if (
				!registerName ||
				!company ||
				!registerPassword ||
				!registerPasswordConfirm ||
				!registerEmail ||
				!registerEmailConfirm
			) {
				console.log('Please fill out the entire form.');
				return;
			}

			if (registerEmail !== registerEmailConfirm) {
				console.log('Email does not match');
				setRegisterEmail('');
				setRegisterEmailConfirm('');
				return;
			}

			if (registerPassword !== registerPasswordConfirm) {
				console.log('Password does not match');
				setRegisterPassword('');
				setRegisterPasswordConfirm('');
				return;
			}

			const bodyObj = {
				name: registerName,
				email: registerEmail,
				password: registerPassword,
				company: company
			};

			API.registerUser(bodyObj)
				.then(res => {
					props.setUser(res.data._id);
					Store.post(res.data._id);
				})
				.catch(err => console.log(err));
		}
	};

	return (
		<div className="login-container">
			{registered ? (
				<Card className="login-card" fluid>
					<h1>Blue Notes | Login</h1>
					<Input
						className="login-content"
						type="email"
						placeholder="Email"
						value={loginEmail}
						onChange={e => setLoginEmail(e.target.value)}
					/>
					<Input
						className="login-content"
						type="password"
						placeholder="Password"
						value={loginPassword}
						onChange={e => setLoginPassword(e.target.value)}
					/>
					<Button onClick={e => handlers.login()} className="login-content">
						Login
					</Button>
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
					<Input
						className="login-content"
						type="text"
						placeholder="Your Name"
						value={registerName}
						onChange={e => setRegisterName(e.target.value)}
					/>
					<Input
						className="login-content"
						type="text"
						placeholder="Business Name"
						value={company}
						onChange={e => setCompany(e.target.value)}
					/>
					<Input
						className="login-content"
						type="email"
						placeholder="Email"
						value={registerEmail}
						onChange={e => setRegisterEmail(e.target.value)}
					/>
					<Input
						className="login-content"
						type="email"
						placeholder="Verify Email"
						value={registerEmailConfirm}
						onChange={e => setRegisterEmailConfirm(e.target.value)}
					/>
					<Input
						className="login-content"
						type="password"
						placeholder="Password"
						value={registerPassword}
						onChange={e => setRegisterPassword(e.target.value)}
					/>
					<Input
						className="login-content"
						type="password"
						placeholder="Verify Password"
						value={registerPasswordConfirm}
						onChange={e => setRegisterPasswordConfirm(e.target.value)}
					/>
					<Button className="login-content" onClick={e => handlers.register()}>
						Register
					</Button>
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
