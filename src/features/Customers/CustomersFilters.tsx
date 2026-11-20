import { useListFilters } from '../../hooks/useListFilters';
import FilterBar from '../../ui/FilterElements/FilterBar';
import FilterSearch from '../../ui/FilterElements/FilterSearch';

export default function CustomersFilters() {
	const { getFilter, setFilter } = useListFilters();
	return (
		<FilterBar>
			<FilterSearch
				value={getFilter('search')}
				onChange={(value) => setFilter('search', value)}
			/>
		</FilterBar>
	);
}
