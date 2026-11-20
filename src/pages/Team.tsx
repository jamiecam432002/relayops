import AppPageHeader from '../ui/HeaderElements/AppPageHeader';
import AppPageHeading from '../ui/HeaderElements/AppPageHeading';
import AppPageActions from '../ui/HeaderElements/AppPageActions';
import TeamTable from '../features/Team/TeamTable';
import TeamFilters from '../features/Team/TeamFilters';
import Button from '../ui/Button';

export default function Team() {
	return (
		<>
			<AppPageHeader>
				<AppPageHeading>
					<h1>Team</h1>
					<p className='text-[1.3rem] text-secondary'>
						Schedule work orders, assign technicians, and manage your team's
						workload.
					</p>
				</AppPageHeading>
				<AppPageActions>
					<Button variation='primary' size='medium'>
						+ Invite member
					</Button>
				</AppPageActions>
			</AppPageHeader>
			<TeamFilters />
			<TeamTable />
		</>
	);
}
