import { HiOutlineBell } from 'react-icons/hi2';

export default function Userbar() {
	return (
		<div className='flex gap-6 items-center'>
			<div>
				<HiOutlineBell className='h-[2.4rem] w-[2.4rem]' />
			</div>
			<div className='flex items-center rounded-[50%] bg-[#dbeafe] text-[#1d4ed8] w-[3rem] h-[3rem] text-[1.1rem] justify-center font-bold'>
				JC
			</div>
		</div>
	);
}
