import DataTable from '../../ui/TableElements/DataTable';
import { statusBadgeConfig } from '../../ui/Badge/statusBadgeConfig';
import StatusBadge from '../../ui/StatusBadge';
import Button from '../../ui/Button';

export default function TeamTableRow({ member }) {
	return (
		<DataTable.Row>
			<td role='cell' className='px-6 py-4 text-secondary sticky'>
				<div className='flex items-center gap-3'>
					<div className='flex items-center rounded-[50%] bg-[#dbeafe] text-[#1d4ed8] w-[3rem] h-[3rem] text-[1rem] justify-center font-bold'>
						JD
					</div>
					<div className='flex flex-col'>
						<span className='font-semibold'>{member.name}</span>
						<span>{member.email}</span>
					</div>
				</div>
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				{member.role}
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				<StatusBadge status={member.status} config={statusBadgeConfig} />
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				<Button variation='secondary' size='condensed'>
					Manage
				</Button>
			</td>
		</DataTable.Row>
	);
}
