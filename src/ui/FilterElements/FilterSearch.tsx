import { Search } from 'lucide-react';

export default function FilterSearch({
	value,
	onChange,
	placeholder = 'Search...',
}) {
	return (
		<div className='relative'>
			<Search className='text-gray-500 absolute top-1/2 left-3 size-8 w-[2.4rem] -translate-y-1/2' />
			<input
				type='search'
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className='border-gray-200 h-16 w-full rounded-md border bg-gray-50 pr-3 pl-16 text-[1.4rem]'
			/>
		</div>
	);
}
