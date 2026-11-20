import FilterBar from '../../ui/FilterElements/FilterBar';
import FilterSelect from '../../ui/FilterElements/FilterSelect';
import { useListFilters } from '../../hooks/useListFilters';
import { teamRoleOptions } from './teamFilterOptions';

export default function TeamFilters() {
	const { getFilter, setFilter } = useListFilters();
	return (
		<FilterBar>
			<FilterSelect
				label='Role'
				value={getFilter('role')}
				onChange={(value) => setFilter('role', value)}
				options={teamRoleOptions}
			/>
		</FilterBar>
	);
}
