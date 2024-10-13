'use client';
import { useTheme } from 'next-themes';

// Do NOT use this! It will throw a hydration mismatch error.
const ThemeSwitch = ({ classHidden }: { classHidden?: string }) => {
	const { theme, setTheme } = useTheme();
	return (
		<input
			type="checkbox"
			checked={theme === 'light'}
			onChange={(e) =>
				e.target.checked ? setTheme('light') : setTheme('luxury')
			}
			className={`${
				classHidden ?? ''
			} toggle col-span-2 col-start-1 row-start-1 border-orange-500 bg-orange-500 [--tglbg:theme(colors.black)] checked:border-gray-600 checked:bg-gray-300 checked:[--tglbg:theme(colors.gray.900)]`}
		/>
	);
};

export default ThemeSwitch;
