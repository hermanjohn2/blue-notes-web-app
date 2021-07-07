import React, { useState } from 'react';
import { Form, Select, Radio, Icon } from 'semantic-ui-react';

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
	const [showFilter, setShowFilter] = useState(false);
	const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

	const filterOptions = [
		{ key: 'filter-option-all', text: 'All Dates', value: 'all-dates' },
		{ key: 'filter-past-7', text: 'Past 7 Days', value: 'past-seven' },
		{ key: 'filter-last-month', text: 'Last Month', value: 'last-month' },
		{ key: 'filter-ytd', text: 'Year To Date', value: 'ytd' },
		{ key: 'filter-last-year', text: 'Last Year', value: 'last-year' },
		{ key: 'filter-advanced', text: 'Advanced', value: 'advanced' }
	];

	const handleFirstFilter = selection => {
		switch (selection) {
			case 'advanced':
				setShowFilter(false);
				setShowAdvancedFilter(true);
				break;

			default:
				console.log(selection);
				break;
		}
	};

	return (
		<div>
			<Form>
				<Icon
					name="filter"
					size="large"
					onClick={() =>
						!showFilter ? setShowFilter(true) : setShowFilter(false)
					}
					checked={showFilter}
				/>

				<Form.Group widths="equal">
					{showFilter ? (
						<Form.Field
							control={Select}
							options={filterOptions}
							label="Filter Options"
							onChange={(e, data) => handleFirstFilter(data.value)}
						/>
					) : null}
					{showAdvancedFilter ? (
						<>
							<Form.Field control={Select} label="By Month" />
							<Form.Field control={Select} label="By Year" />
						</>
					) : null}
				</Form.Group>
			</Form>
			<h1>Gross Sales - ${grossSales}</h1>
			<h1>Paid Jobs - {totalJobs}</h1>
			<h1>Total Customers - {totalCustomers}</h1>
		</div>
	);
};

export default SalesReport;
