import AppPageHeader from '../ui/HeaderElements/AppPageHeader';
import AppPageHeading from '../ui/HeaderElements/AppPageHeading';
import AppPageActions from '../ui/HeaderElements/AppPageActions';
import CustomersTable from '../features/Customers/CustomersTable';
import CustomersFilters from '../features/Customers/CustomersFilters';

export default function Customers() {
	return (
		<>
			<AppPageHeader>
				<AppPageHeading>
					<h1>Customers</h1>
					<p className='text-[1.3rem] text-secondary'>
						Schedule work orders, assign technicians, and manage your team's
						workload.
					</p>
				</AppPageHeading>
				<AppPageActions></AppPageActions>
			</AppPageHeader>
			<CustomersFilters />
			<CustomersTable />
		</>
	);
}
