import {
	Grid,
	Input,
	Label,
	Menu,
	Popup,
	Header,
	Button
} from 'semantic-ui-react';

const CustomMenu = () => {
	const menuHandler = type => {
		console.log(type);
	};
	return (
		<Menu vertical>
			<Popup
				flowing
				hoverable
				trigger={
					<Menu.Item>
						<Label>+</Label>
						Create
					</Menu.Item>
				}>
				<Grid centered divided columns={3}>
					<Grid.Column textAlign="center">
						<Header as="h4">Job</Header>

						<Button>+</Button>
					</Grid.Column>
					<Grid.Column textAlign="center">
						<Header as="h4">Customer</Header>

						<Button>+</Button>
					</Grid.Column>
					<Grid.Column textAlign="center">
						<Header as="h4">Company</Header>

						<Button>+</Button>
					</Grid.Column>
				</Grid>
			</Popup>
			<Popup
				flowing
				hoverable
				trigger={
					<Menu.Item>
						<Label>-</Label>
						Edit
					</Menu.Item>
				}>
				<Grid centered divided columns={3}>
					<Grid.Column textAlign="center">
						<Header as="h4">Job</Header>

						<Button>+</Button>
					</Grid.Column>
					<Grid.Column textAlign="center">
						<Header as="h4">Customer</Header>

						<Button>+</Button>
					</Grid.Column>
					<Grid.Column textAlign="center">
						<Header as="h4">Company</Header>

						<Button>+</Button>
					</Grid.Column>
				</Grid>
			</Popup>
			<Popup
				flowing
				hoverable
				trigger={
					<Menu.Item>
						<Label>$</Label>
						Reports
					</Menu.Item>
				}>
				<Grid centered divided columns={3}>
					<Grid.Column textAlign="center">
						<Header as="h4">Jobs</Header>

						<Button>+</Button>
					</Grid.Column>
					<Grid.Column textAlign="center">
						<Header as="h4">Sales</Header>

						<Button>+</Button>
					</Grid.Column>
					<Grid.Column textAlign="center">
						<Header as="h4">All</Header>

						<Button>+</Button>
					</Grid.Column>
				</Grid>
			</Popup>
		</Menu>
	);
};

export default CustomMenu;
