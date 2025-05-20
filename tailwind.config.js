export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E6F0E6',
          200: '#C2DDBE',
          300: '#9FC996',
          400: '#7BB66D',
          500: '#4B7F52', // Main primary color
          600: '#3B6440',
          700: '#2C4A2F',
          800: '#1D311F',
          900: '#0E190F',
        },
        secondary: {
          100: '#F4F9F0',
          200: '#E9F3E1',
          300: '#DEECD2',
          400: '#C4DFB4',
          500: '#7EC670', // Main secondary color
          600: '#65A558',
          700: '#4C7E41',
          800: '#32542B',
          900: '#192A15',
        },
        accent: {
          100: '#FFF5E9',
          200: '#FFE6C7',
          300: '#FFD7A5',
          400: '#FFC883',
          500: '#8B5A2B', // Main accent color
          600: '#704822',
          700: '#543619',
          800: '#382411',
          900: '#1C1208',
        }
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}