import { List, Icon, Button } from 'semantic-ui-react';
import moment from 'moment';
import './style.css';

const StatsBox = props => {
	console.log(props);
	const editJobConfig = props.config.menuOptions.filter(
		option => option.type === 'edit'
	)[0];
	const editJobSubOpt = editJobConfig.subOptions.filter(
		option => option.type === 'edit-job'
	)[0];

	const lastJob = props.selectedJob;

	// const paidValsArr = props.data
	// 	.filter(job => job.complete)
	// 	.map(job => job.invoiceTotal);

	// const unpaidValsArr = props.data
	// 	.filter(job => !job.complete)
	// 	.map(job => job.invoiceTotal);

	// const totalReducer = (accumulator, currentValue) =>
	// 	accumulator + currentValue;

	const listData = [
		{ key: 'title', text: 'Last Job' },
		{ key: 'invoiceTotal', text: 'Invoice Total' },
		{ key: 'complete', text: 'Complete' },
		{ key: 'datePaid', text: 'Date Paid' },
		{ key: 'notes', text: 'Notes' }
	];

	const handleClick = type => {
		const modal = { ...props.modal };
		const formObj = { ...props.formObj };

		switch (type) {
			case 'job':
				if (lastJob && editJobSubOpt.formData[0]) {
					formObj._id = lastJob._id;
					formObj.title = lastJob.title;
					formObj.invoiceTotal = lastJob.invoiceTotal;
					formObj.customer = lastJob.customer;
					formObj.complete = lastJob.complete;
					formObj.notes = lastJob.notes;
					formObj.datePaid = lastJob.datePaid;

					props.setFormObj(formObj);

					modal.type = 'form';
					modal.title = editJobSubOpt.title;
					modal.show = true;
					modal.method = editJobConfig.type;
					modal.formData = editJobSubOpt.formData;

					props.setModal(modal);
				}
				break;
			case 'customer':
				console.log(lastJob);
				break;

			default:
				break;
		}
	};

	return (
		<>
			<List
				key={`stats-box-list-${lastJob._id}`}
				className="stats-box-list"
				divided
				relaxed>
				{listData.map(row =>
					row.key === 'complete' || lastJob[row.key] ? (
						<List.Item key={`list-item-${row.key}`}>
							<List.Content>
								<List.Header as={row.key === 'title' ? 'h2' : 'h3'}>
									{row.key === 'title' ? lastJob[row.key] : row.text}
								</List.Header>
								<List.Content>
									{row.key === 'invoiceTotal' || row.key === 'notes' ? (
										lastJob[row.key]
									) : row.key === 'complete' && lastJob.complete ? (
										<Icon size="large" name="thumbs up" />
									) : row.key === 'complete' && !lastJob.complete ? (
										<Icon size="large" name="thumbs down" />
									) : row.key === 'datePaid' ? (
										moment(lastJob.datePaid).format('MM-DD-YYYY')
									) : row.key === 'title' ? (
										props.customerName(lastJob.customer, props.customers)
									) : null}
								</List.Content>
							</List.Content>
						</List.Item>
					) : null
				)}
			</List>
			<br />
			<div className="ui two buttons">
				<Button
					onClick={() => handleClick('job')}
					className="stats-box-btn"
					fluid>
					View Job
				</Button>
				<Button
					onClick={() => handleClick('customer')}
					color="blue"
					className="stats-box-btn"
					fluid>
					View Customer
				</Button>
			</div>
		</>
	);
};

export default StatsBox;
