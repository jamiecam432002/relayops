import AppPageHeader from '../ui/HeaderElements/AppPageHeader';
import AppPageHeading from '../ui/HeaderElements/AppPageHeading';
import AppPageActions from '../ui/HeaderElements/AppPageActions';
import SettingsForm from '../features/Settings/SettingsForm';

export default function Settings() {
	return (
		<>
			<AppPageHeader>
				<AppPageHeading>
					<h1>Organization settings</h1>
					<p className='text-[1.3rem] text-secondary'>
						Manage the defaults for XXX.
					</p>
				</AppPageHeading>
				<AppPageActions></AppPageActions>
			</AppPageHeader>
			<SettingsForm />
		</>
	);
}
