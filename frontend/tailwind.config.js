module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		colors: {
			'dark-blue': '#004965',
			'mid-blue': '#29C3FE',
			'light-blue': '#ADE8FF',
			'light-blue-text': 'rgba(0, 73, 100, 0.6)',
			'sh-gray': '#70878F',
			hovertagColor: '#003447',
			'lg-gray': '#F2F2F2',
			white: '#ffffff',
			'lg-orange': '#FF4949',
		},
		fontFamily: {
			serif: ['ui-serif', 'Merriweather', 'serif'],
		},
		minHeight: {
			eighty: '78vh',
		},
		extend: {
			keyframes: {
				scale: {
					'0%': {
						transform: 'scale(0)',
					},
					'100%': {
						transform: 'scale(1)',
					},
				},
			},
		},
	},
	plugins: [],
}
