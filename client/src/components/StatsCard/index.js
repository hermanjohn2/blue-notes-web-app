import { Grid, Card, Message, Icon } from 'semantic-ui-react';
import StatsBarChart from '../StatsBarChart';
import StatsBox from '../StatsBox';
import './style.css';

const StatsCard = props => {
	// console.log(props);
	const header =
		props.type === 'customer'
			? `${props.data.name} | ${props.data.address} | ${props.data.phone}`
			: `Dashboard`;

	const data =
		props.type === 'customer'
			? props.user.jobs.filter(job => job.customer === props.data._id)
			: props.user.jobs;

	// console.log(data);
	return data[0] ? (
		<Card className="stats-card" fluid>
			<Card.Header className="stats-header">
				<h1 className="center aligned">{header}</h1>
			</Card.Header>
			<Grid divided="vertically">
				<Grid.Row columns={2}>
					<Grid.Column width={6}>
						<StatsBox data={data} />
					</Grid.Column>
					<Grid.Column width={6}>
						<StatsBarChart data={data} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
			{data[1] ? (
				<div>
					<h1 className="center aligned">All Jobs</h1>
					{data.map(job => (
						<Message
							className="center aligned"
							color={job.complete ? 'green' : 'red'}>
							{job.title} | Paid:{' '}
							{job.complete ? (
								<Icon name="thumbs up" />
							) : (
								<Icon name="thumbs down" />
							)}{' '}
							|{' '}
							{job.invoiceTotal && job.complete
								? `Paid: ${job.invoiceTotal}`
								: job.invoiceTotal && !job.complete
								? `Owed: ${job.invoiceTotal}`
								: null}{' '}
							{job.notes ? `| Notes: ${job.notes}` : null}
						</Message>
					))}
				</div>
			) : null}
		</Card>
	) : null;
};

export default StatsCard;
