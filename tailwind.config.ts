import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			transitionProperty: {
				wh: 'height,width',
				spacing: 'margin, padding',
			},
			animation: {
				'flip-vertical-right':
					'flip-vertical-right 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
			},
			keyframes: {
				'flip-vertical-right': {
					'0%': {
						transform: 'rotateY(0)',
					},
					'100%': {
						transform: 'rotateY(180deg)',
					},
				},
			},
		},
		fontFamily: {
			'protest-strike-regular': ['Protest Strike', 'sans-serif'],
			'chakra-petch': ['Chakra Petch', 'sans-serif'],
			michelangelo: ['Michelangelo', 'sans-serif'],
			'sf-trans-robotics': ['SF TransRobotics', 'sans-serif'],
		},
		screens: {
			'mb-m': '375px',
			'mb-l': '425px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			'light',
			'dark',
			'cupcake',
			'bumblebee',
			'emerald',
			'corporate',
			'synthwave',
			'retro',
			'cyberpunk',
			'valentine',
			'halloween',
			'garden',
			'forest',
			'aqua',
			'lofi',
			'pastel',
			'fantasy',
			'wireframe',
			'black',
			'luxury',
			'dracula',
			'cmyk',
			'autumn',
			'business',
			'acid',
			'lemonade',
			'night',
			'coffee',
			'winter',
			'dim',
			'nord',
			'sunset',
		],
	},
};
export default config;
