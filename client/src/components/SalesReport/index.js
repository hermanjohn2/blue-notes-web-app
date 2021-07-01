import React, { useState } from 'react';

const SalesReport = props => {
	const paidJobs = props.data.jobs.filter(job => job.datePaid);

	const totalReducer = (accumulator, currentValue) =>
		accumulator + currentValue;

	const [grossSales, setGrossSales] = useState(() =>
		paidJobs.map(job => job.invoiceTotal).reduce(totalReducer)
	);
	const [totalJobs, setTotalJobs] = useState(paidJobs.length);
	const [totalCustomers, setTotalCustomers] = useState(
		props.data.customers.length
	);

	return (
		<div>
			<h1>Gross Sales - ${grossSales}</h1>
			<h1>Paid Jobs - {totalJobs}</h1>
			<h1>Total Customers - {totalCustomers}</h1>
		</div>
	);
};

export default SalesReport;
