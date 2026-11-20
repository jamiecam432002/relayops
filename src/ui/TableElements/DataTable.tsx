import { cn } from 'cn';
import { createContext, useContext } from 'react';

const DataTableContext = createContext();

const rowClasses = {
	default: 'px-[2.4rem] py-[1.2rem]',
	condensed: 'px-[1.5rem] py-0 text-[1.3rem]',
};

export default function DataTable({
	children,
	columns,
	variation = 'default',
}) {
	return (
		<DataTableContext.Provider value={{ columns, variation }}>
			<div className='overflow-x-auto'>
				<table
					className='border-grey-200 bg-grey-0 overflow-hidden rounded-lg border border-solid text-[1.3rem] w-full'
					role='table'>
					{children}
				</table>
			</div>
		</DataTableContext.Provider>
	);
}
function Header({ children }) {
	const { columns, variation } = useContext(DataTableContext);

	return (
		<thead role='rowgroup' className='bg-canvas'>
			<tr
				className={cn(
					'text-mid-gray text-[1.2rem]',
					rowClasses[variation ?? 'default'],
				)}
				role='row'>
				{children}
			</tr>
		</thead>
	);
}

function Row({ children, className = '' }) {
	const { columns, variation } = useContext(DataTableContext);

	return (
		<tr role='row' className={rowClasses[variation] ?? 'default'}>
			{children}
		</tr>
	);
}

function HeaderCell({ children, className = '' }) {
	return (
		<th
			role='columnheader'
			className={`first:sticky min-w-0 font-bold text-left ${className}`}>
			{children}
		</th>
	);
}

function Cell({ children, className = '' }) {
	return (
		<td role='cell' className={cn('min-w-0', className)}>
			{children}
		</td>
	);
}

function Footer({ children, colSpan }) {
	return (
		<tfoot>
			<tr>
				<td colSpan={colSpan} className='px-6 pt-4 text-secondary'>
					<div className='flex justify-center'>{children}</div>
				</td>
			</tr>
		</tfoot>
	);
}

function Body({ data = [], render, colSpan }) {
	return (
		<tbody
			role='rowgroup'
			className='divide-y divide-[#E2E8F0] border-b border-[#E2E8F0]'>
			{data.length === 0 ? (
				<tr>
					<td colSpan={colSpan} className='py-10 text-center'>
						No data to show at the moment
					</td>
				</tr>
			) : (
				data.map(render)
			)}
		</tbody>
	);
}

DataTable.Header = Header;
DataTable.HeaderCell = HeaderCell;
DataTable.Body = Body;
DataTable.Row = Row;
DataTable.Cell = Cell;
DataTable.Footer = Footer;
