import React, { useState } from 'react';
import { Form, Select, Radio, Icon, Button } from 'semantic-ui-react';
import moment from 'moment';

const filterOptions = [
	{ key: 'filter-option-all', text: 'All Dates', value: 'all-dates' },
	{ key: 'filter-past-7', text: 'Past 7 Days', value: 'past-seven' },
	{ key: 'filter-last-month', text: 'Past 30 Days', value: 'last-month' },
	{ key: 'filter-ytd', text: 'Year To Date', value: 'ytd' },
	{ key: 'filter-last-year', text: 'Last Year', value: 'last-year' },
	{ key: 'filter-advanced', text: 'Advanced', value: 'advanced' }
];

const totalReducer = (accumulator, currentValue) => accumulator + currentValue;

const SalesReport = props => {
	const today = moment().format('MM/DD/YY');
	const userCustomers = props.data.customers;
	const paidJobs = props.data.jobs.filter(job => job.datePaid);
	const userTotalGross = paidJobs
		.map(job => job.invoiceTotal)
		.reduce(totalReducer);

	const [grossSales, setGrossSales] = useState(userTotalGross);
	const [totalJobs, setTotalJobs] = useState(paidJobs.length);
	const [totalCustomers, setTotalCustomers] = useState(userCustomers.length);
	const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
	const [dateRange, setDateRange] = useState();
	const [advancedStartDate, setAdvancedStartDate] = useState();
	const [advancedEndDate, setAdvancedEndDate] = useState();

	const filter = {
		reset: () => {
			setGrossSales(userTotalGross);
			setTotalJobs(paidJobs.length);
			setTotalCustomers(userCustomers.length);
			setDateRange();
		},
		byDate: (startDate, endDate) => {
			const filteredJobs = paidJobs.filter(job =>
				moment(job.datePaid).isAfter(startDate) &&
				moment(job.datePaid).isBefore(endDate)
					? true
					: false
			);

			setTotalCustomers(
				filteredJobs[0]
					? [...new Set(filteredJobs.map(job => job.customer))].length
					: 0
			);
			setTotalJobs(filteredJobs[0] ? filteredJobs.length : 0);
			setGrossSales(
				filteredJobs[0]
					? filteredJobs.map(job => job.invoiceTotal).reduce(totalReducer)
					: 0
			);
			setDateRange(
				`${moment(startDate).format('MM/DD/YY')} - ${moment(endDate).format(
					'MM/DD/YY'
				)}`
			);
		}
	};

	const handleFilter = selection => {
		if (
			selection !== 'advanced' &&
			selection !== 'month-year' &&
			showAdvancedFilter
		) {
			setShowAdvancedFilter(false);
		}

		switch (selection) {
			case 'advanced':
				setShowAdvancedFilter(true);
				break;
			case 'all-dates':
				filter.reset();
				break;
			case 'past-seven':
				filter.byDate(moment().subtract(7, 'days'), moment(today));
				break;
			case 'last-month':
				filter.byDate(moment().subtract(1, 'month'), moment(today));
				break;
			case 'ytd':
				filter.byDate(
					moment(`01-01-${moment(today).format('YYYY')}`),
					moment(today)
				);
				break;
			case 'last-year':
				const year = moment(today).subtract(1, 'year').format('YYYY');
				filter.byDate(moment(`01-01-${year}`), moment(`12-31-${year}`));
				break;
			case 'month-year':
				filter.byDate(advancedStartDate, advancedEndDate);
				break;
			default:
				break;
		}
	};

	return (
		<div>
			<Form>
				<Form.Group widths="equal">
					<Form.Field
						control={Select}
						options={filterOptions}
						label="Filter Options"
						onChange={(e, data) => handleFilter(data.value)}
					/>

					{showAdvancedFilter ? (
						<>
							<Form.Input
								label="Start"
								type="date"
								onChange={e => setAdvancedStartDate(e.target.value)}
							/>
							<Form.Input
								label="End"
								type="date"
								onChange={e => setAdvancedEndDate(e.target.value)}
							/>
							{advancedStartDate && advancedEndDate ? (
								<Button onClick={() => handleFilter('month-year')}>
									Submit
								</Button>
							) : null}
						</>
					) : null}
				</Form.Group>
			</Form>
			{dateRange ? <p>{dateRange}</p> : null}

			<h1>Gross Sales - ${grossSales}</h1>
			<h1>Paid Jobs - {totalJobs}</h1>
			<h1>Total Customers - {totalCustomers}</h1>
		</div>
	);
};

export default SalesReport;
