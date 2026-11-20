import { MdCalendarMonth, MdEditDocument, MdCheck } from 'react-icons/md';
import { motion } from 'motion/react';
import StatCard from '../../../ui/StatCards';
import { HiOutlinePlay } from 'react-icons/hi2';

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

export default function OverviewStatCards() {
	const cards = [
		{
			title: 'Open Work Orders',
			value: 42,
			change: '-12%',
			metric: 'vs. last week',
			icon: MdEditDocument,
			style: 'round',
			color: 'blue',
		},
		{
			title: 'Scheduled Today',
			value: 18,
			change: '+6%',
			metric: 'vs. last week',
			icon: MdCalendarMonth,
			style: 'round',
			color: 'blue',
		},
		{
			title: 'In Progress',
			value: 12,
			change: '+20%',
			metric: 'vs. last week',
			icon: HiOutlinePlay,
			style: 'round',
			color: 'amber',
		},
		{
			title: 'Completion Rate',
			value: '94%',
			change: '+3 pp',
			metric: 'vs. last week',
			icon: MdCheck,
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
