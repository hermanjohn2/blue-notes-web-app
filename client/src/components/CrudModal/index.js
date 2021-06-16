import { useState } from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import CustomMessage from '../CustomMessage';
import API from '../../utils/API';

const CrudModal = props => {
	const [formObj, setFormObj] = useState();
	const [messageData, setMessageData] = useState({
		show: false,
		type: '',
		text: ''
	});

	const modal = props.modal ? props.modal : null;
	const method = modal.title
		? modal.title.replace(' ', '-').toLowerCase()
		: null;
	const userId = props.user._id;
	const customers = props.user.customers;
	const customerSelectionArr = customers[0]
		? customers.map(customer => {
				return {
					key: customer._id,
					text: customer.name,
					value: customer._id
				};
		  })
		: [];

	const createCustomerOption = {
		key: 1,
		text: 'Create New Customer',
		value: 0
	};

	customerSelectionArr.push(createCustomerOption);

	const modalHandler = {
		close: () => {
			const newModal = { ...modal };
			newModal.show = false;
			props.setModal(newModal);

			const messageObj = { ...messageData };
			messageObj.show = false;
			setMessageData(messageObj);

			setFormObj();
		},
		message: (type, text) => {
			const obj = {};
			obj.show = true;
			obj.type = type;
			obj.text = text;

			setMessageData(obj);

			if (type === 'success' || type === 'error')
				setTimeout(() => modalHandler.close(), 2000);
		},
		form: async () => {
			const user = { ...props.user };
			const formObject = { ...formObj };

			try {
				if (method) {
					switch (method) {
						case 'create-customer':
							if (formObj && formObj.name) {
								formObject.user = userId;

								const newCustomer = await API.createCustomer(formObject);

								user.customers.push(newCustomer.data);

								props.setUser(user);

								modalHandler.message('success', 'New Customer Created!');
							} else {
								throw new Error('No Data');
							}
							break;
						case 'create-job':
							if (formObj && formObj.title && formObj.customer !== 0) {
								formObject.user = userId;

								const newJob = await API.createJob(formObject);

								user.jobs.push(newJob.data);

								props.setUser(user);

								modalHandler.message('success', 'New Job Created!');
							} else if (formObj && formObj.title && formObj.customer === 0) {
								const custObj = {
									user: userId,
									name: `Customer for ${formObj.title}`
								};

								const newCustomer = await API.createCustomer(custObj);

								user.customers.push(newCustomer.data);

								formObject.user = userId;

								formObject.customer = newCustomer.data._id;

								const newJob = await API.createJob(formObject);

								user.jobs.push(newJob.data);

								modalHandler.message('success', 'New Customer & Job Created!');
							} else {
								throw new Error('No Data');
							}

							break;
						case 'create-company':
							modalHandler.message(
								'error',
								'This feature is currently unavailable. Please try again later.'
							);

							break;
						default:
							break;
					}
				} else throw new Error('Reset');
			} catch (err) {
				if (err.message === 'No Data') {
					modalHandler.message('warning', 'Please fill out all fields.');
				} else {
					modalHandler.message(
						'error',
						'Something went wrong. Please try again.'
					);
				}
			}
		},
		formObj: (item, data) => {
			const obj = { ...formObj };
			const key = item.key;
			obj[key] = data;
			setFormObj(obj);
		}
	};

	return (
		<>
			{modal ? (
				<Modal closeIcon open={modal.show} onClose={() => modalHandler.close()}>
					<Header
						icon={
							modal.type === 'create'
								? 'plus'
								: modal.type === 'edit'
								? 'undo'
								: modal.type === 'read'
								? 'dollar sign'
								: 'archive'
						}
						content={modal.title}
					/>
					<Modal.Content>
						{modal.type === 'create' ? (
							<Form onSubmit={e => modalHandler.form(e)}>
								{modal.formData.map(item => (
									<Form.Field key={item.name.replace(' ', '-').toLowerCase()}>
										{item.type === 'input' ? (
											<Form.Input
												onChange={e =>
													modalHandler.formObj(item, e.target.value)
												}
												fluid
												label={item.name}
												placeholder={item.name}
											/>
										) : item.type === 'selection' ? (
											<Form.Select
												onChange={(e, data) =>
													modalHandler.formObj(item, data.value)
												}
												options={customerSelectionArr}
												fluid
												label={item.name}
												placeholder={item.name}
											/>
										) : item.type === 'text-box' ? (
											<Form.TextArea
												onChange={e =>
													modalHandler.formObj(item, e.target.value)
												}
												label={item.name}
												placeholder={item.name}
											/>
										) : null}
									</Form.Field>
								))}
							</Form>
						) : null}

						<CustomMessage data={messageData} />
					</Modal.Content>
					<Modal.Actions>
						<Button
							onClick={() =>
								modal.type === 'create' ? modalHandler.form() : null
							}
							color="blue">
							<Icon name="checkmark" /> Submit
						</Button>
					</Modal.Actions>
				</Modal>
			) : null}
		</>
	);
};

export default CrudModal;
