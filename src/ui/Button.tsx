const sizes = {
	small: `text-[1.3rem] px-[1rem] py-[0.4rem]`,
	medium: `text-[1.4rem] px-[1.2rem] py-[0.7rem]`,
	condensed: `text-[1.3rem] px-[1.2rem] py-[0.7rem]`,
};

const variations = {
	primary: `text-white bg-action hover:bg-action-hover`,
	secondary: `text-secondary bg-white border border-[#cdd8e7] hover:brightness-97`,
};

export default function Button({
	variation = 'primary',
	size = 'medium',
	children,
}) {
	let styles = `flex items-center font-semibold rounded-xl cursor-pointer`;
	return (
		<button
			type='button'
			className={`${styles} ${sizes[size]} ${variations[variation]}`}>
			{children}
		</button>
	);
}
