import { Button, Card, List } from 'semantic-ui-react';
import StatsTable from '../StatsTable';

const ModalCards = props => {
	const cardsArr =
		props.action === 'edit-customer' || props.action === 'customer-report'
			? props.customers
			: props.action === 'edit-job'
			? props.jobs
			: [];
	const header =
		props.action === 'edit-customer' || props.action === 'customer-report'
			? 'name'
			: props.action === 'edit-job'
			? 'title'
			: 'N/A';

	const listArr =
		props.action === 'edit-customer' || props.action === 'customer-report'
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
		if (type === 'edit' || type === 'read') {
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
					formObj.datePaid = data.datePaid;
					break;
				case 'edit-customer':
					formObj._id = data._id;
					formObj.name = data.name;
					formObj.phone = data.phone;
					formObj.address = data.address;
					break;

				case 'customer-report':
					modal.type = 'report';
					modal.reportData = data;
					modal.reportType = 'customer';
					props.setModal(modal);
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

	const arrayStats = (type, arr, customerId) => {
		switch (type) {
			case 'total':
				return arr.filter(item => item.customer === customerId).length;

			case 'complete':
				return arr.filter(item => item.customer === customerId && item.complete)
					.length;
			case 'incomplete':
				return arr.filter(
					item => item.customer === customerId && !item.complete
				).length;

			default:
				return [];
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
							{props.action === 'customer-report' ? (
								<StatsTable
									data={{
										headers: ['Total Jobs', 'Paid', 'No Payment'],
										values: [
											[
												arrayStats('total', props.jobs, item._id),
												arrayStats('complete', props.jobs, item._id),
												arrayStats('incomplete', props.jobs, item._id)
											]
										]
									}}
								/>
							) : null}
						</Card.Description>
					</Card.Content>
					<Card.Content extra>
						{props.action === 'edit-customer' || props.action === 'edit-job' ? (
							<div className="ui two buttons">
								<Button color="blue" onClick={() => cardHandler('edit', item)}>
									Edit
								</Button>
								<Button color="red" onClick={() => cardHandler('delete', item)}>
									Delete
								</Button>
							</div>
						) : props.action === 'customer-report' ? (
							<Button
								fluid
								color="blue"
								onClick={() => cardHandler('read', item)}>
								View Report
							</Button>
						) : null}
					</Card.Content>
				</Card>
			))}
		</Card.Group>
	) : null;
};

export default ModalCards;
