import Pagination from '../../ui/TableElements/Pagination';

const technicians = [
	{
		id: 1,
		name: 'WO-7842',
		customer: 'Riverside Apartments',
		service: 'HVAC Service',
		technician: 'M. Carter',
		time: '8:00 AM',
		status: 'in_progress',
	},
	{
		id: 2,
		name: 'WO-7843',
		customer: 'Oakridge Medical',
		service: 'Plumbing Repair',
		technician: 'J. Nguyen',
		time: '9:30 AM',
		status: 'scheduled',
	},
	{
		id: 3,
		name: 'WO-7844',
		customer: 'Maple Leaf Cafe',
		service: 'Equipment Install',
		technician: 'S. Patel',
		time: '11:00 AM',
		status: 'scheduled',
	},
	{
		id: 4,
		name: 'WO-7845',
		customer: 'Pinecrest Offices',
		service: 'HVAC Repair',
		technician: 'M. Carter',
		time: '1:00 PM',
		status: 'scheduled',
	},
	{
		id: 5,
		name: 'WO-7846',
		customer: 'Lakeside Retail',
		service: 'Maintenance',
		technician: 'A. Rivera',
		time: '2:30 PM',
		status: 'pending',
	},
];

export default function TechnicianWorkloadTable() {
	return (
		<div>
			<Card>
				<CardContent>
					<div className='flex justify-between items-center mt-5 mb-5'>
						<h2>Todays Jobs (18)</h2>
						<Link
							className='text-[1.4rem] text-action font-semibold flex items-center gap-2'
							to='/'>
							<span>View All</span>
							<HiArrowRight />
						</Link>
					</div>

					<DataTable>
						<DataTable.Header>
							<DataTable.HeaderCell className='px-6 py-4'>
								Technician
							</DataTable.HeaderCell>
							<DataTable.HeaderCell className='px-6 py-4'>
								Booked hours
							</DataTable.HeaderCell>
						</DataTable.Header>
						<DataTable.Body
							data={technicians}
							colSpan={6}
							render={(technician) => (
								<TechnicianWorkloadTableRow
									technician={technician}
									key={technician.id}
								/>
							)}></DataTable.Body>
						<DataTable.Footer colSpan={5}>
							<Pagination />
						</DataTable.Footer>
					</DataTable>
				</CardContent>
			</Card>
		</div>
	);
}
