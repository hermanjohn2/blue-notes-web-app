import { Form } from 'semantic-ui-react';

const ModalForm = props => {
	return (
		<Form>
			{props.modal.formData.map(item => (
				<Form.Field key={item.name.replace(' ', '-').toLowerCase()}>
					{item.type === 'input' ? (
						<Form.Input
							onChange={e => props.modalHandler.formObj(item, e.target.value)}
							value={props.formObj ? props.formObj[item.key] : ''}
							fluid
							label={item.name}
							placeholder={item.name}
						/>
					) : item.type === 'selection' ? (
						<Form.Select
							onChange={(e, data) =>
								props.modalHandler.formObj(item, data.value)
							}
							options={props.selectionArr}
							value={props.formObj ? props.formObj[item.key] : ''}
							fluid
							label={item.name}
							placeholder={item.name}
						/>
					) : item.type === 'radio' ? (
						<Form.Radio
							label={item.name}
							slider
							onChange={(e, data) =>
								props.modalHandler.formObj(item, data.checked)
							}
							checked={props.formObj ? props.formObj[item.key] : false}
						/>
					) : item.type === 'text-box' ? (
						<Form.TextArea
							onChange={e => props.modalHandler.formObj(item, e.target.value)}
							label={item.name}
							placeholder={item.name}
							value={props.formObj ? props.formObj[item.key] : ''}
						/>
					) : null}
				</Form.Field>
			))}
		</Form>
	);
};

export default ModalForm;
