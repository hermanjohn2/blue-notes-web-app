import {
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar
} from 'recharts';

const StatsBarChart = props => {
	console.log(props);
	const data = props.data.map(item => {
		return {
			name: item.title,
			'Invoice Total': item.invoiceTotal,
			Paid: item.complete ? item.invoiceTotal : 0
		};
	});

	return data[0] ? (
		<BarChart width={500} height={300} data={data}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="Invoice Total" label="Invoice Total" fill="#8884d8" />
			<Bar dataKey="Paid" label="Paid" fill="green" />
		</BarChart>
	) : null;
};

export default StatsBarChart;
