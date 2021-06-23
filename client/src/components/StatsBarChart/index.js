import { Card } from 'semantic-ui-react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import moment from 'moment';
import './style.css';

const StatsBarChart = props => {
	const data = props.data
		? props.data
				.filter(item => item.datePaid)
				.sort((a, b) => {
					const dateA = moment(a.datePaid).format('YYYY-MM-DD').split('-');
					const dateB = moment(b.datePaid).format('YYYY-MM-DD').split('-');
					if (dateA[0] > dateB[0]) return -1;
					else if (dateA[0] < dateB[0]) return 1;
					else if (dateA[1] > dateB[1]) return -1;
					else if (dateA[1] < dateB[1]) return 1;
					else if (dateA[2] > dateB[2]) return -1;
					else if (dateA[2] > dateB[2]) return 1;
					else return 0;
				})
				.map(item => {
					const customer = props.customers.filter(
						customer => customer._id === item.customer
					)[0];

					item.customerName = customer.name;
					item.customerAddress = customer.address;
					item.phone = customer.phone;
					item.datePaid = moment(item.datePaid).format('MM-DD-YY');
					return item;
				})
		: [];

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload[0]) {
			const data = payload[0];
			return (
				<Card key={data.payload._id} fluid>
					<Card.Header textAlign="center" as="h3">
						{data.payload.title}
					</Card.Header>

					<Card.Content textAlign="center">
						<h5>{data.payload.customerAddress}</h5>
						<h5>{data.payload.phone}</h5>
						<h5>Total: ${data.value}</h5>
						<h5>Date Paid: {data.payload.datePaid}</h5>
					</Card.Content>
				</Card>
			);
		}

		return null;
	};

	return data[0] ? (
		<BarChart width={500} height={300} data={data}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="datePaid" />
			<YAxis />
			<Tooltip content={<CustomTooltip />} />
			<Bar
				className="chart-bar"
				onClick={data =>
					props.setSelectedJob({
						_id: data._id,
						title: data.title,
						customer: data.customer,
						complete: data.complete,
						datePaid: data.datePaid,
						notes: data.notes,
						invoiceTotal: data.invoiceTotal
					})
				}
				dataKey="invoiceTotal"
				label="invoiceTotal"
				fill="#8884d8"
			/>
		</BarChart>
	) : null;
};

export default StatsBarChart;
