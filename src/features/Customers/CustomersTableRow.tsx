import DataTable from '../../ui/TableElements/DataTable';

export default function CustomersTableRow({ customer }) {
	return (
		<DataTable.Row>
			<td role='cell' className='px-6 py-4 text-action font-semibold'>
				{customer.name}
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				{customer.primary_contact}
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				{customer.email}
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				{customer.number_locations}
			</td>
		</DataTable.Row>
	);
}
