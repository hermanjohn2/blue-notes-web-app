import { Grid, Card } from 'semantic-ui-react';
import StatsBarChart from '../StatsBarChart';
import StatsBox from '../StatsBox';
import './style.css';

const StatsCard = props => {
	const selectedJob = props.selectedJob
		? props.selectedJob
		: props.user.jobs[0];

	const header =
		props.type === 'customer'
			? `${props.data.name} | ${props.data.address} | ${props.data.phone}`
			: `Dashboard`;

	const data =
		props.type === 'customer'
			? props.user.jobs.filter(job => job.customer === props.data._id)
			: props.user.jobs;

	return data[0] ? (
		<Card className="stats-card" fluid>
			<Card.Header className="stats-header">
				<h1 className="center aligned">{header}</h1>
			</Card.Header>
			<Grid divided="vertically">
				<Grid.Row columns={2}>
					<Grid.Column width={6}>
						<StatsBox
							selectedJob={selectedJob}
							setSelectedJob={props.setSelectedJob}
							config={props.config}
							modal={props.modal}
							setModal={props.setModal}
							formObj={props.setFormObj}
							setFormObj={props.setFormObj}
							customerName={props.customerName}
							customers={props.user.customers}
							jobs={data}
						/>
					</Grid.Column>
					<Grid.Column width={6}>
						<StatsBarChart
							data={data}
							customers={props.user.customers}
							setSelectedJob={props.setSelectedJob}
							customerName={props.customerName}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Card>
	) : null;
};

export default StatsCard;
