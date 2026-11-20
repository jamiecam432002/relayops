export default function FormElement({ fieldName, label = '', children }) {
	return (
		<div className='grid grid-col mb-5'>
			<label htmlFor={fieldName} className='input-label'>
				{label || fieldName}
			</label>
			{children}
		</div>
	);
}
