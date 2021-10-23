let colors = require('tailwindcss/colors')
const { backgroundSize } = require('tailwindcss/defaultTheme')
let defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	mode: 'jit',
	darkMode: 'media',
	theme: {
		extend: {
			screens: {
				'print': { raw: 'print' }
			}
		},
	},
	variants: {
		extend: {
			colors: {
				cyan: colors.cyan
			}
		},
	},
	plugins: [
		function ({ addUtilities, theme }) {
			let utilities = {
				'.bg-stripes': {
					backgroundImage: 
						'linear-gradient(45deg, var(--stripes-color) 12.50% transparent 12.50%',
					backgroundSize: '5.66px 5.66px',
				}
			}
		},

		require('@tailwindcss/forms')
	],
}
