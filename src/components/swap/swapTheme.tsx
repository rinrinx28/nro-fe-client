'use client';
import { useTheme } from 'next-themes';

// Do NOT use this! It will throw a hydration mismatch error.
const ThemeSwitch = () => {
	const { theme, setTheme } = useTheme();

	return (
		<input
			type="checkbox"
			value="light"
			defaultChecked={theme === 'light'}
			onChange={(e) =>
				e.target.checked ? setTheme('light') : setTheme('luxury')
			}
			className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-amber-500 bg-neutral-content [--tglbg:theme(colors.amber.500)] checked:border-gray-600 checked:bg-gray-300 checked:[--tglbg:theme(colors.gray.900)]"
		/>
	);
};

export default ThemeSwitch;
