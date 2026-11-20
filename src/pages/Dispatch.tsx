import AppPageHeader from '../ui/HeaderElements/AppPageHeader';
import AppPageHeading from '../ui/HeaderElements/AppPageHeading';
import AppPageActions from '../ui/HeaderElements/AppPageActions';

export default function Dispatch() {
	return (
		<>
			<AppPageHeader>
				<AppPageHeading>
					<h1>Dispatch Board</h1>
					<p className='text-[1.3rem] text-secondary'>
						Schedule work orders, assign technicians, and manage your team's
						workload.
					</p>
				</AppPageHeading>
				<AppPageActions></AppPageActions>
			</AppPageHeader>
		</>
	);
}
