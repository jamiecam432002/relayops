import { Outlet } from 'react-router';
import AppSidebar from './AppSidebar';
import ClientBar from './HeaderElements/ClientBar';

export default function AppLayout() {
	return (
		<div>
			<AppSidebar />
			<main className='w-full pt-0 pr-[3rem] pb-[6.4rem] pl-[62px] lg:pl-[72px] lg:pl-[220px] bg-grey-50'>
				<ClientBar />
				<Outlet />
			</main>
		</div>
	);
}
