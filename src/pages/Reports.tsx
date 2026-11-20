import AppPageHeader from '../ui/HeaderElements/AppPageHeader';
import AppPageHeading from '../ui/HeaderElements/AppPageHeading';
import AppPageActions from '../ui/HeaderElements/AppPageActions';
import ReportsStatCards from '../features/Reports/ReportsStatsCards';

export default function Reports() {
	return (
		<>
			<AppPageHeader>
				<AppPageHeading>
					<h1>Reports</h1>
					<p className='text-[1.3rem] text-secondary'>
						Monitor completion, and overdue work and workload.
					</p>
				</AppPageHeading>
				<AppPageActions></AppPageActions>
			</AppPageHeader>
			<ReportsStatCards />
		</>
	);
}
