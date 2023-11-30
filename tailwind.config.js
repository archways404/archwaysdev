/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#212121',
				secondary: '#323232',
				accents: '#14FFEC',
				tlight: '#EEEEEE',
				tdarker: '#a7a9be',
			},
		},
	},
	plugins: [],
};

// https://colorhunt.co/palette/2121213232320d737714ffec