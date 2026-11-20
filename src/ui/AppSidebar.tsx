import Logo from './Logo';
import MainNav from './MainNav';

export default function AppSidebar() {
	return (
		<div className='fixed left-0 row-span-full flex h-dvh w-[52px] lg:w-[200px] flex-col gap-[2rem] px-[8px] lg:px-5 py-10 bg-primary'>
			<Logo />
			<MainNav />
		</div>
	);
}
