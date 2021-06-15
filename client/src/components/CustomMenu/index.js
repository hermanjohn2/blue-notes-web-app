import { Menu, Dropdown } from 'semantic-ui-react';

const CustomMenu = props => {
	const menuItems = props.config.menuOptions;

	return (
		<Menu fluid vertical>
			{menuItems.map(item => (
				<Dropdown key={`menu-dropdown-${item.type}`} item text={item.title}>
					<Dropdown.Menu>
						{item.subOptions.map(subItem => (
							<Dropdown.Item
								key={subItem.type}
								onClick={() =>
									props.setModal({
										show: true,
										title: subItem.title,
										type: item.type,
										formData: subItem.formData
									})
								}>
								{subItem.optionText}
							</Dropdown.Item>
						))}
					</Dropdown.Menu>
				</Dropdown>
			))}
		</Menu>
	);
};

export default CustomMenu;
