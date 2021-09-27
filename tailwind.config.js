module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#f8faf9',
          DEFAULT: '#f1f6f5',
          dark: '#f6fafb',
        },
        brand: {
          light: '#d1dbd5',
          DEFAULT: '#bccac1',
          dark: '#708f7c',
        },
        notify: {
          DEFAULT: '#f04c0f',
        },
      },
      cursor: {
        grabbing: 'grabbing ',
      },
      animation: {
        tilt: 'tilt 10s infinite linear',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(0.5deg)',
          },
          '75%': {
            transform: 'rotate(-0.5deg)',
          },
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      animation: ['hover', 'focus'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
