import { useState } from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';

const CrudModal = props => {
	const [formObj, setFormObj] = useState();

	const modal = props.modal ? props.modal : null;
	const method = modal.title
		? modal.title.replace(' ', '-').toLowerCase()
		: null;

	const options = [
		{ key: '1', text: 'John Doe', value: '1' },
		{ key: '2', text: 'Jane Doe', value: '2' },
		{ key: '3', text: 'Jessica Doe', value: '3' }
	];

	const modalHandler = {
		close: () => {
			const newModal = { ...modal };
			newModal.show = false;
			props.setModal(newModal);
			setFormObj();
		},
		form: () => {
			if (method) {
				switch (method) {
					case 'create-customer':
						console.log(formObj);
						modalHandler.close();
						break;
					case 'create-job':
						console.log(formObj);
						modalHandler.close();
						break;
					case 'create-company':
						console.log(formObj);
						modalHandler.close();
						break;
					default:
						break;
				}
			}
		},
		formObj: (item, data) => {
			const obj = { ...formObj };
			const key = item.name.replace(' ', '-').toLowerCase();
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
												options={options}
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
