import AppPageHeader from '../ui/HeaderElements/AppPageHeader';
import AppPageHeading from '../ui/HeaderElements/AppPageHeading';
import AppPageActions from '../ui/HeaderElements/AppPageActions';
import WorkOrdersTable from '../features/WorkOrders/WorkOrdersTable';
import WorkOrdersFilters from '../features/WorkOrders/WorkOrdersFilters';
import Button from '../ui/Button';

export default function WorkOrders() {
	return (
		<>
			<AppPageHeader>
				<AppPageHeading>
					<h1>Work Orders</h1>
					<p className='text-[1.3rem] text-secondary'>
						Schedule work orders, assign technicians, and manage your team's
						workload.
					</p>
				</AppPageHeading>
				<AppPageActions>
					<Button variation='primary' size='medium'>
						+ New work order
					</Button>
				</AppPageActions>
			</AppPageHeader>
			<WorkOrdersFilters />
			<WorkOrdersTable />
		</>
	);
}
