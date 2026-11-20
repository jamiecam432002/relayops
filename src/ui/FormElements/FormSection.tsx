import { Card, CardContent } from '../../components/ui/card';

export default function FormSection({ sectionHeader = '', children }) {
	return (
		<Card>
			<CardContent>
				{sectionHeader && <h3 className='font-bold mb-6'>{sectionHeader}</h3>}
				{children}
			</CardContent>
		</Card>
	);
}
