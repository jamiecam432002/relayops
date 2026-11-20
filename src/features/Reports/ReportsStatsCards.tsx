import { MdCalendarMonth, MdEditDocument, MdCheck } from 'react-icons/md';
import { motion } from 'motion/react';
import { HiOutlinePlay } from 'react-icons/hi2';
import StatCard from '../../ui/StatCards';

const container = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.25,
		},
	},
};

const card = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	show: {
		opacity: 1,
		y: 0,
	},
};

export default function ReportsStatCards() {
	const cards = [
		{
			title: 'Completed orders',
			value: 124,
			metric: 'Orders completed in this period',
			style: 'round',
			color: 'blue',
		},
		{
			title: 'Completion rate',
			value: '94%',
			metric: 'Completed % orders due in the range',
			style: 'round',
			color: 'blue',
		},
		{
			title: 'Overdue rate',
			value: '6%',
			metric: 'Overdue and unfinished % orders due',
			style: 'round',
			color: 'amber',
		},
		{
			title: 'Avg. completion time',
			value: '3.8 h',
			metric: 'Average time from start to completion',
			style: 'round',
			color: 'green',
		},
	];
	return (
		<motion.div
			className='grid grid-cols-4 gap-6 mb-5 mt-5'
			variants={container}
			initial='hidden'
			animate='show'>
			{cards.map((statCard) => (
				<motion.div variants={card}>
					<StatCard key={statCard.title} {...statCard} />
				</motion.div>
			))}
		</motion.div>
	);
}
