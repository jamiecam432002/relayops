import { Card, CardContent } from '../../components/ui/card';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../components/ui/tabs';

export default function CustomerTabs({ className = '' }) {
	return (
		<div className={className}>
			<Card>
				<CardContent>
					<Tabs defaultValue='locations'>
						<TabsList variant='line'>
							<TabsTrigger value='locations'>Locations</TabsTrigger>
							<TabsTrigger value='contacts'>Contacts</TabsTrigger>
							<TabsTrigger value='orderhistory'>Order history</TabsTrigger>
						</TabsList>
						<TabsContent value='locations'>
							<h3 className='text-black mb-1 text-[1.3rem]'>Service request</h3>
							<p className='mb-5'>
								Unit B's rooftop HVAC is running but the second-floor suites are
								receiving warm air. Check the filters and test output after
								service.
							</p>
							<h3 className='text-black mb-1 text-[1.3rem]'>
								Site instructions
							</h3>
							<p>
								Check in at reception for roof access. Call the site contact
								before arrival.
							</p>
						</TabsContent>
						<TabsContent value='contacts'>
							<p>This is the contacts info</p>
						</TabsContent>
						<TabsContent value='orderhistory'>
							<p>This is the order history info</p>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
