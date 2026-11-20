import FilterBar from '../../ui/FilterElements/FilterBar';
import FilterSelect from '../../ui/FilterElements/FilterSelect';
import { useListFilters } from '../../hooks/useListFilters';
import {
	workOrdersPriorityOptions,
	workOrdersStatusOptions,
} from './workOrderFilterOptions';

export default function WorkOrdersFilters() {
	const { getFilter, setFilter } = useListFilters();
	return (
		<FilterBar>
			<FilterSelect
				label='Status'
				value={getFilter('status')}
				onChange={(value) => setFilter('status', value)}
				options={workOrdersStatusOptions}
			/>
			<FilterSelect
				label='Priority'
				value={getFilter('priority')}
				onChange={(value) => setFilter('priority', value)}
				options={workOrdersPriorityOptions}
			/>
		</FilterBar>
	);
}
