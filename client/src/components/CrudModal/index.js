import { useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

import API from '../../utils/API';

import ModalForm from '../ModalForm';
import ModalCards from '../ModalCards';
import CustomMessage from '../CustomMessage';

const CrudModal = props => {
	const [formObj, setFormObj] = useState();
	const [messageData, setMessageData] = useState({
		show: false,
		type: '',
		text: ''
	});
	const modal = props.modal ? props.modal : null;
	const action = modal.title
		? modal.title.replace(' ', '-').toLowerCase()
		: null;
	const customers = props.user.customers;
	const jobs = props.user.jobs;
	const customerSelectionArr = customers
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
			const messageObj = { ...messageData };
			messageObj.show = false;
			setMessageData(messageObj);

			const newModal = { ...modal };
			newModal.show = false;
			props.setModal(newModal);

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
			let updatedUser;
			let message;

			try {
				if (action && user) {
					switch (action) {
						case 'create-customer':
							if (formObject && formObject.name) {
								updatedUser = await API.createUserCustomer(formObject, user);
								message = 'Success! New customer created.';
							} else throw new Error('No Data');
							break;

						case 'create-job':
							if (formObject && formObject.title) {
								updatedUser = await API.createUserJob(formObject, user);
								message = 'Success! New job created.';
							} else throw new Error('No Data');
							break;

						case 'create-company':
							modalHandler.message(
								'error',
								'This feature is currently unavailable. Please try again later.'
							);

							break;
						case 'edit-job':
							if (formObject && formObject.title && formObject.customer) {
								updatedUser = await API.editUserJob(formObject, user);
								message = 'Success! Job updated.';
							} else throw new Error('No Data');
							break;

						default:
							break;
					}

					props.setUser(updatedUser);
					modalHandler.message('success', message);
				} else throw new Error('Reset');
			} catch (err) {
				if (err.message === 'No Data') {
					modalHandler.message('warning', 'Please fill out all fields.');
				} else {
					modalHandler.message(
						'error',
						'Something went wrong. Please try again.'
					);
					console.log(err);
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
							modal.method === 'create'
								? 'plus'
								: modal.method === 'edit'
								? 'undo'
								: modal.method === 'read'
								? 'dollar sign'
								: 'archive'
						}
						content={modal.title}
					/>
					<Modal.Content>
						{modal.type === 'form' ? (
							<ModalForm
								modal={modal}
								modalHandler={modalHandler}
								selectionArr={customerSelectionArr}
								formObj={formObj}
							/>
						) : modal.type === 'cards' ? (
							<ModalCards
								customers={customers}
								jobs={jobs}
								action={action}
								modal={props.modal}
								setModal={props.setModal}
								formObj={formObj}
								setFormObj={setFormObj}
							/>
						) : null}
						{messageData.show ? <CustomMessage data={messageData} /> : null}
					</Modal.Content>

					{modal.type === 'form' ? (
						<Modal.Actions>
							<Button onClick={() => modalHandler.form()} color="blue">
								<Icon name="checkmark" /> Submit
							</Button>
						</Modal.Actions>
					) : null}
				</Modal>
			) : null}
		</>
	);
};

export default CrudModal;
