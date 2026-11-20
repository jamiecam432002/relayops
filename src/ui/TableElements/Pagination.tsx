import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

export default function Pagination() {
	return (
		<div className='flex w-full items-center justify-between'>
			<p className='ml-3 text-[1.2rem] [&_span]:font-semibold'>
				Showing <span>1</span> to <span>10</span> of <span>50</span> results
			</p>
			<div className='flex gap-2'>
				<button className='flex items-center justify-center gap-2 rounded-sm border-0 px-[1.2rem] py-[0.6rem] text-[1.2rem] font-medium'>
					<HiChevronLeft /> <span>Previous</span>
				</button>
				<button className='flex items-center justify-center gap-2 rounded-sm border-0 px-[1.2rem] py-[0.6rem] text-[1.2rem] font-medium'>
					<span>Next</span> <HiChevronRight />
				</button>
			</div>
		</div>
	);
}
