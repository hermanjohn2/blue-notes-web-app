import moment from 'moment';
import { Grid, Card } from 'semantic-ui-react';
import StatsBarChart from '../StatsBarChart';
import StatsList from '../StatsList';
import './style.css';

const StatsContainer = props => {
	const selectedJob = props.selectedJob
		? props.selectedJob
		: props.modal.type === 'customer-report'
		? props.user.jobs
				.filter(job => job.customer === props.modal.reportData._id)
				.sort((a, b) =>
					moment(a.datePaid) < moment(b.datePaid)
						? 1
						: moment(a.datePaid) === moment(b.datePaid)
						? 0
						: -1
				)[0]
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
						<StatsList
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

export default StatsContainer;
