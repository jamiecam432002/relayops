import DataTable from '../../ui/TableElements/DataTable';
import { Card, CardContent } from '../../components/ui/card';
import TeamTableRow from './TeamTableRow';
import Pagination from '../../ui/TableElements/Pagination';

const members = [
	{
		id: 1,
		name: 'Jordan Davis',
		email: 'jordan@northline.example',
		role: 'Admin',
		status: 'active',
	},
	{
		id: 2,
		name: 'Riley Lopez',
		email: 'riley@northline.example',
		role: 'Dispatcher',
		status: 'inactive',
	},
	{
		id: 3,
		name: 'Morgan Carter',
		email: 'morgan@northline.example',
		role: 'Technician',
		status: 'active',
	},
	{
		id: 4,
		name: 'Jamie Nguyen',
		email: 'jamie@northline.example',
		role: 'Technician',
		status: 'active',
	},
];

export default function TeamTable() {
	return (
		<div>
			<Card>
				<CardContent>
					<DataTable>
						<DataTable.Header>
							<DataTable.HeaderCell className='px-6 py-4'>
								Member
							</DataTable.HeaderCell>
							<DataTable.HeaderCell className='px-6 py-4'>
								Role
							</DataTable.HeaderCell>
							<DataTable.HeaderCell className='px-6 py-4'>
								Status
							</DataTable.HeaderCell>
							<DataTable.HeaderCell className='px-6 py-4'>
								Actions
							</DataTable.HeaderCell>
						</DataTable.Header>
						<DataTable.Body
							data={members}
							colSpan={4}
							render={(member) => (
								<TeamTableRow member={member} key={member.id} />
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
