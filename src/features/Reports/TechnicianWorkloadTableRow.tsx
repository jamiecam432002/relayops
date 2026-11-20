export default function TechnicianWorkloadTableRow({ technician }) {
	return (
		<DataTable.Row>
			<td role='cell' className='px-6 py-4 text-secondary'>
				{technician.name}
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				{technician.hours}
			</td>
		</DataTable.Row>
	);
}
