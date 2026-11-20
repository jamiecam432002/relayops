import { Card, CardContent } from '@/components/ui/card';

const variants = {
	blue: {
		container: 'bg-blue-100',
		icon: 'text-blue-600',
	},
	amber: {
		container: 'bg-orange-100',
		icon: 'text-warning',
	},
	green: {
		container: 'bg-green-100',
		icon: 'text-green-600',
	},
};

export default function StatCard({
	title,
	value,
	icon: Icon = null,
	change = '',
	metric,
	style,
	color,
}) {
	const styles = variants[color];
	return (
		<Card>
			<CardContent className='flex gap-3 pt-1 pr-4 pb-1 pl-4'>
				{Icon && (
					<div className='flex flex-col items-start'>
						<div className={`rounded-control p-3 ${styles.container}`}>
							<Icon aria-hidden='true' className={`size-12 ${styles.icon}`} />
						</div>
					</div>
				)}
				<div className='flex flex-col pl-4'>
					<h3 className='mb-0'>{title}</h3>
					<p className='text-[30px] font-bold'>{value}</p>
					<p className='text-[1.2rem] text-mid-gray font-medium'>
						{change && (
							<span className='text-[1.3rem] font-bold text-success'>
								{change}
							</span>
						)}{' '}
						{metric}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
