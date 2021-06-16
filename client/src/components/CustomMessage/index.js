import { Message } from 'semantic-ui-react';

const CustomMessage = props => {
	const color =
		props.data.type === 'warning'
			? 'yellow'
			: props.data.type === 'error'
			? 'red'
			: props.data.type === 'success'
			? 'green'
			: null;

	return props.data && color ? (
		<Message color={color}>
			<Message.Header>{props.data.text}</Message.Header>
		</Message>
	) : null;
};

export default CustomMessage;
