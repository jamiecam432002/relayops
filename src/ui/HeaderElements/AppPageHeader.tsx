export default function AppPageHeader({ children }) {
	return (
		<div className='flex flex-col lg:flex-row mt-6 justify-between'>
			{children}
		</div>
	);
}
