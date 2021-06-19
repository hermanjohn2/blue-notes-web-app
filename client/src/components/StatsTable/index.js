import { Table } from 'semantic-ui-react';

const StatsTable = props => {
	return (
		<Table celled>
			<Table.Header>
				<Table.Row>
					{props.data.headers.map(header => (
						<Table.HeaderCell key={header}>{header}</Table.HeaderCell>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{props.data.values.map((row, i) => (
					<Table.Row key={`table-row-${i}`}>
						{row.map(value => (
							<Table.Cell key={`cell-value-${value}`}>{value}</Table.Cell>
						))}
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
};
//
export default StatsTable;
