import { useSearchParams } from 'react-router';

export function useListFilters() {
	const [searchParams, setSearchParams] = useSearchParams();

	function getFilter(key) {
		return searchParams.get(key) || 'all';
	}

	function setFilter(key, value) {
		setSearchParams((current) => {
			const next = new URLSearchParams(current);

			if (!value || value === 'all') {
				next.delete(key);
			} else {
				next.set(key, value);
			}

			next.delete('page');

			return next;
		});
	}
	return { getFilter, setFilter };
}
