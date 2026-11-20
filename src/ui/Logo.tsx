import { NavLink } from 'react-router';

export default function Logo() {
	return (
		<div className='flex'>
			<NavLink to='/app/34/overview'>
				<img
					className='h-[36px] w-auto'
					src='/relayops-logo.svg'
					alt='RelayOps'
				/>
			</NavLink>
		</div>
	);
}
