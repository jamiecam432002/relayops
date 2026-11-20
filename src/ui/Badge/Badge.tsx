import { cn } from 'cn';

const tones = {
	neutral: 'bg-[#f1f5f9] text-[#475569]',
	success: 'bg-[#dcfce7] text-[#166534]',
	warning: 'bg-[#fef3c7] text-[#92400e]',
	info: 'bg-[#dbeafe] text-[#1d4ed8]',
	sky: 'bg-[#e0f2fe] text-[#0369a1]',
	danger: 'bg-[#fee2e2] text-[#991b1b]',
};

const sizes = {
	sm: 'px-3.5 py-1.5 text-[1.3rem]',
	md: 'px-3 py-1.5 text-[1.6rem]',
};

export default function Badge({
	children,
	tone = 'neutral',
	size = 'sm',
	className,
}) {
	return (
		<span
			className={cn(
				'inline-flex w-fit items-center rounded-full',
				'whitespace-nowrap font-semibold leading-none',
				tones[tone],
				sizes[size],
				className,
			)}>
			{children}
		</span>
	);
}
