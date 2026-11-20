import Userbar from './Userbar';

export default function ClientBar() {
	return (
		<div className='flex justify-between pt-6 pb-5 border-b text-secondary items-center'>
			<p className='text-[1.3rem]'>Northline Services</p>
			<Userbar />
		</div>
	);
}
