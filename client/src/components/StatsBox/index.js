import { List, Icon } from 'semantic-ui-react';
import moment from 'moment';
import './style.css';

const StatsBox = props => {
	const lastJob = props.data[0];

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

	return (
		<List className="stats-box-list" divided relaxed>
			{listData.map(row =>
				lastJob[row.key] ? (
					<List.Item>
						<List.Content>
							<List.Header as="h3">{row.text}</List.Header>
							<List.Content>
								{row.key === 'title' ||
								row.key === 'invoiceTotal' ||
								row.key === 'notes' ? (
									lastJob[row.key]
								) : row.key === 'complete' && lastJob.complete ? (
									<Icon size="large" name="thumbs up" />
								) : row.key === 'complete' && !lastJob.complete ? (
									<Icon size="large" name="thumbs down" />
								) : row.key === 'datePaid' ? (
									moment(lastJob.datePaid).format('MM-DD-YYYY')
								) : null}
							</List.Content>
						</List.Content>
					</List.Item>
				) : null
			)}
		</List>
	);
};

export default StatsBox;
