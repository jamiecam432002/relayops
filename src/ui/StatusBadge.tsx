import Badge from './Badge/Badge';

export default function StatusBadge({
	status,
	config,
	className = '',
	...props
}) {
	const badge = config[status] ?? {
		label: status?.replaceAll('_', ' ') ?? 'Unknown',
		tone: 'neutral',
	};
	return (
		<Badge tone={badge.tone} className={className} {...props}>
			{badge.label}
		</Badge>
	);
}
