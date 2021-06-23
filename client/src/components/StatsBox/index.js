import { List, Icon, Button } from 'semantic-ui-react';
import moment from 'moment';
import './style.css';

const StatsBox = props => {
	const editJobConfig = props.config.menuOptions.filter(
		option => option.type === 'edit'
	)[0];
	const editJobSubOpt = editJobConfig.subOptions.filter(
		option => option.type === 'edit-job'
	)[0];

	const viewCustomerConfig = props.config.menuOptions.filter(
		option => option.type === 'read'
	)[0];

	const viewCustomerSubOpt = viewCustomerConfig.subOptions.filter(
		option => option.type === 'read-customer-report'
	)[0];

	const selectedJob = props.selectedJob;

	const currentCustomer = props.customers
		? props.customers.filter(
				customer => customer._id === selectedJob.customer
		  )[0]
		: null;

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
				if (selectedJob && editJobSubOpt.formData[0]) {
					modal.type = 'form';
					modal.title = editJobSubOpt.title;
					modal.show = true;
					modal.method = editJobConfig.type;
					modal.formData = editJobSubOpt.formData;

					formObj._id = selectedJob._id;
					formObj.title = selectedJob.title;
					formObj.invoiceTotal = selectedJob.invoiceTotal;
					formObj.customer = selectedJob.customer;
					formObj.complete = selectedJob.complete;
					formObj.notes = selectedJob.notes;
					formObj.datePaid = selectedJob.datePaid;

					props.setFormObj(formObj);
				}
				break;

			case 'customer':
				modal.show = true;
				modal.type = 'report';
				modal.title = viewCustomerSubOpt.title;
				modal.reportData = currentCustomer;
				modal.reportType = 'customer';

				const currentJob = props.jobs.filter(
					job => job.customer === currentCustomer._id
				)[0];

				props.setSelectedJob(currentJob);
				break;

			default:
				break;
		}
		props.setModal(modal);
	};

	return (
		<>
			<List
				key={`stats-box-list-${selectedJob._id}`}
				className="stats-box-list"
				divided
				relaxed>
				{listData.map(row =>
					row.key === 'complete' || selectedJob[row.key] ? (
						<List.Item key={`list-item-${row.key}`}>
							<List.Content>
								<List.Header as={row.key === 'title' ? 'h2' : 'h3'}>
									{row.key === 'title' ? selectedJob[row.key] : row.text}
								</List.Header>
								<List.Content>
									{row.key === 'invoiceTotal' || row.key === 'notes' ? (
										selectedJob[row.key]
									) : row.key === 'complete' && selectedJob.complete ? (
										<Icon size="large" name="thumbs up" />
									) : row.key === 'complete' && !selectedJob.complete ? (
										<Icon size="large" name="thumbs down" />
									) : row.key === 'datePaid' ? (
										moment(selectedJob.datePaid).format('MM-DD-YYYY')
									) : row.key === 'title' ? (
										props.customerName(selectedJob.customer, props.customers)
									) : null}
								</List.Content>
							</List.Content>
						</List.Item>
					) : null
				)}
			</List>
			<br />
			{!props.modal.show ? (
				<div className="ui two buttons">
					<Button
						onClick={() => handleClick('job')}
						className="stats-box-btn"
						color="purple"
						fluid>
						Edit Job
					</Button>
					<Button
						onClick={() => handleClick('customer')}
						color="blue"
						className="stats-box-btn"
						fluid>
						View Customer
					</Button>
				</div>
			) : (
				<Button
					onClick={() => handleClick('job')}
					className="stats-box-btn"
					color="blue"
					fluid>
					Edit Job
				</Button>
			)}
		</>
	);
};

export default StatsBox;
