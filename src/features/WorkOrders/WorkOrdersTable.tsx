import DataTable from '../../ui/TableElements/DataTable';
import { Card, CardContent } from '../../components/ui/card';
import WorkOrdersTableRow from './WorkOrdersTableRow';
import Pagination from '../../ui/TableElements/Pagination';

const workOrders = [
	{
		id: 1,
		order_id: 'WO-7842',
		customer: 'Riverside Apartments',
		service: 'HVAC Service',
		technician: 'M. Carter',
		time: '8:00 AM',
		status: 'in_progress',
		priority: 'high',
	},
	{
		id: 2,
		order_id: 'WO-7843',
		customer: 'Oakridge Medical',
		service: 'Plumbing Repair',
		technician: 'J. Nguyen',
		time: '9:30 AM',
		status: 'scheduled',
		priority: 'normal',
	},
	{
		id: 3,
		order_id: 'WO-7844',
		customer: 'Maple Leaf Cafe',
		service: 'Equipment Install',
		technician: 'S. Patel',
		time: '11:00 AM',
		status: 'scheduled',
		priority: 'normal',
	},
	{
		id: 4,
		order_id: 'WO-7845',
		customer: 'Pinecrest Offices',
		service: 'HVAC Repair',
		technician: 'M. Carter',
		time: '1:00 PM',
		status: 'scheduled',
		priority: 'normal',
	},
	{
		id: 5,
		order_id: 'WO-7846',
		customer: 'Lakeside Retail',
		service: 'Maintenance',
		technician: 'A. Rivera',
		time: '2:30 PM',
		status: 'pending',
		priority: 'urgent',
	},
];

export default function WorkOrdersTable() {
	return (
		<div>
			<Card>
				<CardContent>
					<DataTable>
						<DataTable.Header>
							<DataTable.HeaderCell className='px-6 py-4'>
								Order
							</DataTable.HeaderCell>
							<DataTable.HeaderCell className='px-6 py-4'>
								Customer
							</DataTable.HeaderCell>
							<DataTable.HeaderCell className='px-6 py-4'>
								Location/Service
							</DataTable.HeaderCell>
							<DataTable.HeaderCell className='px-6 py-4'>
								Scheduled
							</DataTable.HeaderCell>
							<DataTable.HeaderCell className='px-6 py-4'>
								Technician
							</DataTable.HeaderCell>
							<DataTable.HeaderCell className='px-6 py-4'>
								Status
							</DataTable.HeaderCell>
							<DataTable.HeaderCell className='px-6 py-4'>
								Priority
							</DataTable.HeaderCell>
						</DataTable.Header>
						<DataTable.Body
							data={workOrders}
							colSpan={7}
							render={(workorder) => (
								<WorkOrdersTableRow workorder={workorder} key={workorder.id} />
							)}></DataTable.Body>
						<DataTable.Footer colSpan={7}>
							<Pagination />
						</DataTable.Footer>
					</DataTable>
				</CardContent>
			</Card>
		</div>
	);
}
