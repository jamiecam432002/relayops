import OverviewStatCards from '../features/Overview/components/OverviewStatCards';
import AppPageActions from '../ui/HeaderElements/AppPageActions';
import AppPageHeader from '../ui/HeaderElements/AppPageHeader';
import AppPageHeading from '../ui/HeaderElements/AppPageHeading';
import EntityDetail from '../ui/TableElements/EntityDetail';
import CustomerTabs from '../features/Customers/CustomerTabs';
import TodaysJobsTable from '../features/Overview/components/TodaysJobsTable';

const orderItems = [
	{
		label: 'Customer',
		value: 'Riverside Apartments',
	},
	{
		label: 'Location',
		value: '1250 Riverside Dr, Unit B',
	},
	{
		label: 'Technician',
		value: 'M. Carter',
	},
	{
		label: 'Scheduled',
		value: 'Nov 6 (8-10 AM)',
	},
];

export default function Overview() {
	return (
		<>
			<AppPageHeader>
				<AppPageHeading>
					<h1>Operations Overview</h1>
					<p className='text-[1.3rem] text-secondary'>
						Your team's work, schedule, and performance at a glance.
					</p>
				</AppPageHeading>
				<AppPageActions></AppPageActions>
			</AppPageHeader>
			<OverviewStatCards />
			<div className='flex gap-4 mt-5'>
				<EntityDetail items={orderItems} className='flex-[0_0_40%]' />
				<CustomerTabs className='flex-1' />
			</div>
			<div className='mt-5'>
				<TodaysJobsTable />
			</div>
		</>
	);
}
