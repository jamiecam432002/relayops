import { Card, CardContent } from '../../components/ui/card';

export default function EntityDetail({ items, className = '' }) {
	return (
		<div className={className}>
			<Card>
				<CardContent>
					<h3 className='mb-5 text-[1.4rem]'>Order summary</h3>
					<dl className='divide-y divide-[#E2E8F0]'>
						{items.map(({ label, value }) => (
							<div key={label} className='flex flex-col pt-2 pb-2'>
								<dt className='text-[1.2rem] text-mid-gray font-semibold mb-1'>
									{label}
								</dt>
								<dd className='text-[1.3rem] text-secondary'>{value ?? '-'}</dd>
							</div>
						))}
					</dl>
				</CardContent>
			</Card>
		</div>
	);
}
