import DataTable from '../../ui/TableElements/DataTable';
import { Card, CardContent } from '../../components/ui/card';
import CustomersTableRow from './CustomersTableRow';
import Pagination from '../../ui/TableElements/Pagination';

const customers = [
	{
		id: 1,
		name: 'Riverside Apartments',
		primary_contact: 'Taylor Brooks',
		email: 'taylor@riverside.example',
		number_locations: 3,
	},
	{
		id: 2,
		name: 'Oakridge Medical',
		primary_contact: 'Morgan Ellis',
		email: 'morgan@oakridge.example',
		number_locations: 2,
	},
	{
		id: 3,
		name: 'Maple Leaf Cafe',
		primary_contact: 'Alex Chen',
		email: 'alex@mapleleaf.example',
		number_locations: 1,
	},
	{
		id: 4,
		name: 'Lakeside Retail',
		primary_contact: 'Avery Singh',
		email: 'avery@lakeside.example',
		number_locations: 2,
	},
];

export default function CustomersTable() {
	return (
		<div>
			<Card>
				<CardContent>
					<DataTable>
						<DataTable.Header>
							<DataTable.HeaderCell className='px-6 py-4'>
								Customer
							</DataTable.HeaderCell>
							<DataTable.HeaderCell className='px-6 py-4'>
								Primary contact
							</DataTable.HeaderCell>
							<DataTable.HeaderCell className='px-6 py-4'>
								Email
							</DataTable.HeaderCell>
							<DataTable.HeaderCell className='px-6 py-4'>
								Service locations
							</DataTable.HeaderCell>
						</DataTable.Header>
						<DataTable.Body
							data={customers}
							colSpan={4}
							render={(customer) => (
								<CustomersTableRow customer={customer} key={customer.id} />
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
