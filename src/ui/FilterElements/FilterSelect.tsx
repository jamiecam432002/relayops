import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
	SelectItem,
	SelectGroup,
} from '../../components/ui/select';

export default function FilterSelect({
	label,
	value,
	options,
	onChange,
	icon = null,
	placeholder = '',
}) {
	return (
		<div className='flex flex-col gap-2'>
			<Select value={value} onValueChange={onChange} items={options}>
				<SelectTrigger className='border-grey-200 bg-white w-[230px] rounded-md border px-4 py-8 font-semibold shadow-sm [&_svg]:h-[2rem] [&_svg]:w-[2rem]'>
					{icon && icon}
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
