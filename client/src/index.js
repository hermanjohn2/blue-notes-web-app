import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import env from 'react-dotenv';
import { Auth0Provider } from '@auth0/auth0-react';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
	<React.StrictMode>
		<Auth0Provider
			domain={env.auth0_domain}
			clientId={env.auth0_client_id}
			redirectUri={window.location.origin}>
			<App />
		</Auth0Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// pass in a function to log performance
reportWebVitals();
