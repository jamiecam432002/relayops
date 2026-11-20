import StatusBadge from '../../ui/StatusBadge';
import DataTable from '../../ui/TableElements/DataTable';
import { workorderBadgeConfig } from '../../ui/Badge/workorderBadgeConfig';
import { priorityBadgeConfig } from '../../ui/Badge/priorityBadgeConfig';

export default function WorkOrdersTableRow({ workorder }) {
	return (
		<DataTable.Row>
			<td role='cell' className='px-6 py-4 text-secondary font-semibold'>
				{workorder.order_id}
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				{workorder.customer}
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				{workorder.service}
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				{workorder.time}
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				{workorder.technician}
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				<StatusBadge status={workorder.status} config={workorderBadgeConfig} />
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				<StatusBadge status={workorder.priority} config={priorityBadgeConfig} />
			</td>
		</DataTable.Row>
	);
}
