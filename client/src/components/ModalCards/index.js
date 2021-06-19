import { Button, Card, List } from 'semantic-ui-react';

const ModalCards = props => {
	const cardsArr =
		props.action === 'edit-customer'
			? props.customers
			: props.action === 'edit-job'
			? props.jobs
			: [];
	const header =
		props.action === 'edit-customer'
			? 'name'
			: props.action === 'edit-job'
			? 'title'
			: 'N/A';

	const listArr =
		props.action === 'edit-customer'
			? [
					{ key: 'address', text: 'Address' },
					{ key: 'phone', text: 'Phone' }
			  ]
			: props.action === 'edit-job'
			? [
					{ key: 'customer', text: 'Customer' },
					{ key: 'notes', text: 'Notes' },
					{ key: 'invoiceTotal', text: 'Invoice Total' },
					{ key: 'complete', text: 'Status' }
			  ]
			: [];

	const customerName = id =>
		props.customers.filter(customer => customer._id === id)[0].name;

	const cardHandler = (type, data) => {
		if (type === 'edit') {
			const modal = { ...props.modal };
			const formObj = {};

			switch (props.action) {
				case 'edit-job':
					formObj._id = data._id;
					formObj.title = data.title;
					formObj.invoiceTotal = data.invoiceTotal;
					formObj.customer = data.customer;
					formObj.complete = data.complete;
					formObj.notes = data.notes;
					break;
				case 'edit-customer':
					formObj._id = data._id;
					formObj.name = data.name;
					formObj.phone = data.phone;
					formObj.address = data.address;
					break;

				default:
					break;
			}

			if (Object.keys(formObj)[0]) {
				modal.type = 'form';
				props.setModal(modal);
				props.setFormObj(formObj);
			} else return;
		} else {
			console.log('DELETE');
		}
	};

	return cardsArr[0] ? (
		<Card.Group>
			{cardsArr.map(item => (
				<Card key={item._id}>
					<Card.Content>
						<Card.Header>{item[header]}</Card.Header>

						<Card.Description>
							<List divided relaxed>
								{listArr[0]
									? listArr.map(listItem =>
											item[listItem.key] ? (
												<List.Item key={listItem.key}>
													{listItem.text}:{' '}
													{listItem.text === 'Customer'
														? customerName(item[listItem.key])
														: item[listItem.key]}
												</List.Item>
											) : null
									  )
									: null}
							</List>
						</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<div className="ui two buttons">
							<Button color="blue" onClick={() => cardHandler('edit', item)}>
								Edit
							</Button>
							<Button color="red" onClick={() => cardHandler('delete', item)}>
								Delete
							</Button>
						</div>
					</Card.Content>
				</Card>
			))}
		</Card.Group>
	) : null;
};

export default ModalCards;
