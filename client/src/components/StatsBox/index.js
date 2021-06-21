import { List, Icon } from 'semantic-ui-react';
import './style.css';

const StatsBox = props => {
	console.log(props);
	const lastJob = props.data[props.data.length - 1];
	console.log(lastJob);

	const paidValsArr = props.data
		.filter(job => job.complete)
		.map(job => job.invoiceTotal);

	const unpaidValsArr = props.data
		.filter(job => !job.complete)
		.map(job => job.invoiceTotal);

	const totalReducer = (accumulator, currentValue) =>
		accumulator + currentValue;

	const listData = [
		{ key: 'title', text: 'Last Job' },
		{ key: 'invoiceTotal', text: 'Invoice Total' },
		{ key: 'notes', text: 'Notes' },
		{ key: 'complete', text: 'Paid' },
		{ key: 'totalJobs', text: 'Total Jobs' },
		{ key: 'totalPaid', text: 'Total Paid' },
		{ key: 'totalOwed', text: 'Total Owed' }
	];

	return (
		<List className="stats-box-list" divided relaxed>
			{listData.map(row => (
				<List.Item>
					<List.Content>
						<List.Header as="h3">{row.text}</List.Header>
						<List.Content>
							{row.key === 'title' ||
							row.key === 'invoiceTotal' ||
							row.key === 'notes' ? (
								lastJob[row.key]
							) : row.key === 'complete' && lastJob.complete ? (
								<Icon size="big" name="thumbs up" />
							) : row.key === 'complete' && !lastJob.complete ? (
								<Icon size="big" name="thumbs down" />
							) : row.key === 'totalJobs' ? (
								props.data.length
							) : row.key === 'totalPaid' ? (
								paidValsArr[0] ? (
									paidValsArr.reduce(totalReducer)
								) : (
									0
								)
							) : row.key === 'totalOwed' ? (
								unpaidValsArr[0] ? (
									unpaidValsArr.reduce(totalReducer)
								) : (
									0
								)
							) : null}
						</List.Content>
					</List.Content>
				</List.Item>
			))}
		</List>
	);
};

export default StatsBox;
