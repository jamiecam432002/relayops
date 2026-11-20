import { NavLink } from 'react-router';
import {
	HiHome,
	HiClipboardDocumentList,
	HiCalendar,
	HiMiniUsers,
	HiChartBar,
	HiMiniCog8Tooth,
} from 'react-icons/hi2';

export default function MainNav() {
	return (
		<nav>
			<ul className='flex flex-col gap-[0.8rem] lg:w-auto'>
				<li>
					<NavLink
						to='app/34/overview'
						className='group block lg:flex items-center gap-[1.2rem] px-[8px] lg:px-[1.6rem] py-[1rem] text-white [&.active]:bg-action [&.active]:rounded-xl'>
						<HiHome className='text-white h-[2rem] w-[2rem]' />
						<span className='text-[1.4rem] font-medium hidden lg:block'>
							Overview
						</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='app/34/work-orders'
						className='group block lg:flex items-center gap-[1.2rem] px-[8px] lg:px-[1.6rem] py-[1rem] text-white [&.active]:bg-action [&.active]:rounded-xl'>
						<HiClipboardDocumentList className='text-white h-[2rem] w-[2rem]' />
						<span className='text-[1.4rem] font-medium hidden lg:block'>
							Work Orders
						</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='app/34/dispatch'
						className='group block lg:flex items-center gap-[1.2rem] px-[8px] lg:px-[1.6rem] py-[1rem] text-white [&.active]:bg-action [&.active]:rounded-xl'>
						<HiCalendar className='text-white h-[2rem] w-[2rem]' />
						<span className='text-[1.4rem] font-medium hidden lg:block'>
							Dispatch
						</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='app/34/customers'
						className='group block lg:flex items-center gap-[1.2rem] px-[8px] lg:px-[1.6rem] py-[1rem] text-white [&.active]:bg-action [&.active]:rounded-xl'>
						<HiMiniUsers className='text-white h-[2rem] w-[2rem]' />
						<span className='text-[1.4rem] font-medium hidden lg:block'>
							Customers
						</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='app/34/team'
						className='group block lg:flex items-center gap-[1.2rem] px-[8px] lg:px-[1.6rem] py-[1rem] text-white [&.active]:bg-action [&.active]:rounded-xl'>
						<HiMiniUsers className='text-white h-[2rem] w-[2rem]' />
						<span className='text-[1.4rem] font-medium hidden lg:block'>
							Team
						</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='app/34/reports'
						className='group block lg:flex items-center gap-[1.2rem] px-[8px] lg:px-[1.6rem] py-[1rem] text-white [&.active]:bg-action [&.active]:rounded-xl'>
						<HiChartBar className='text-white h-[2rem] w-[2rem]' />
						<span className='text-[1.4rem] font-medium hidden lg:block'>
							Reports
						</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						to='app/34/settings'
						className='group block lg:flex items-center gap-[1.2rem] px-[8px] lg:px-[1.6rem] py-[1rem] text-white [&.active]:bg-action [&.active]:rounded-xl'>
						<HiMiniCog8Tooth className='text-white h-[2rem] w-[2rem]' />
						<span className='text-[1.4rem] font-medium hidden lg:block'>
							Settings
						</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
