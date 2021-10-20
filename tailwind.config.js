module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: 'media',
  theme: {
    extend: {
      screens: {
        'print': {raw: 'print'}
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
