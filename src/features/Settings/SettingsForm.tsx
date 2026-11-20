import ButtonGroup from '../../ui/ButtonGroup';
import Form from '../../ui/FormElements/Form';
import FormElement from '../../ui/FormElements/FormElement';
import FormSection from '../../ui/FormElements/FormSection';
import Button from '../../ui/Button';

export default function SettingsForm() {
	return (
		<div>
			<Form>
				<FormSection sectionHeader='General'>
					<FormElement fieldName='organization_name' label='Organization Name'>
						<input type='text' id='organization_name' className='input-txt' />
					</FormElement>
					<FormElement
						fieldName='organization_timezone'
						label='Organization Timezone'>
						<input
							type='text'
							id='organization_timezone'
							className='input-txt'
						/>
					</FormElement>
					<p className='text-[1.2rem] text-secondary'>
						Dispatch and reports display dates and times in this timezone.
					</p>
				</FormSection>
				<ButtonGroup>
					<Button variation='secondary' size='medium'>
						Cancel
					</Button>
					<Button variation='primary' size='medium'>
						Create work order
					</Button>
				</ButtonGroup>
			</Form>
		</div>
	);
}
