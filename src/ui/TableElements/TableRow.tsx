import StatusBadge from '../StatusBadge';
import DataTable from './DataTable';
import { statusBadgeConfig } from '../Badge/statusBadgeConfig';

export default function TableRow({ product }) {
	return (
		<DataTable.Row>
			<td role='cell' className='px-6 py-4 text-secondary'>
				{product.name}
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				{product.sku}
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				{product.category}
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				{product.quantity}
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				{product.price}
			</td>
			<td role='cell' className='px-6 py-4 text-secondary'>
				<StatusBadge status={product.status} config={statusBadgeConfig} />
			</td>
		</DataTable.Row>
	);
}
