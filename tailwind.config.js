/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				bp: '#191A19',
				p: '#1E5128',
				s: '#4E9F3D',
				light: '#D8E9A8',
			},
		},
	},
	plugins: [],
};
