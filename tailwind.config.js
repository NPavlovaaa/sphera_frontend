/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      mainWhite: '#ffffff',
      mainOrange:{
        100: 'rgba(255, 168, 46, 0.2)',
        600: '#FFA82E',
        700: 'rgba(255,168,46,0.76)',
      },
      mainGray: '#939393',
      lightGray: 'rgba(223, 223, 223, 0.27)',
      red: {
        700: '#EC5859',
        100: 'rgba(236, 88, 89, 0.2)'
      },
      green: {
        700: '#48BA20',
        100: 'rgba(36, 255, 0, 0.2)'
      },
      gray: {
        700: '#939393',
        100: 'rgba(147, 147, 147, 0.2)'
      },
      blue: {
        700: '#0085FF',
        100: 'rgba(0, 133, 255, 0.2)',
      }
    },
    screens: {
      'sm': {'min': '640px', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1439px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }
      '2xl': {'min': '1440px', 'max': '1634px'},
      // => @media (min-width: 1440px and max-width: 1634px) { ... }
      '3xl': {'min': '1635px', 'max': '1999px'},
      '4xl': {'min': '2000px'},
      // => @media (min-width: 1635px){ ... }
    },
    fontSize: {
      xs: ['0.75rem', '1rem'],
      sm: ['0.875rem', '1.25rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.1rem', '1.75rem'],
      xl: ['1.25rem', '1.75rem'],
      '2xl': ['1.563rem', '2rem'],
      '3xl': ['1.953rem', '2.25rem'],
      '4xl': ['2.441rem', '2.5rem'],
      '5xl': ['3.052rem', '1'],
      '6xl': ['3rem', '1'],
      '7xl': ['4.4rem', '1'],
      '8xl': ['5.1rem', '1.12'],
      '9xl': ['6.5rem', '1.12'],
      '10xl': ['8rem', '1.12'],
    },
  },
  plugins: [
    // plugin(function({ matchUtilities, theme }) {
    //   matchUtilities(
    //       {
    //         'translate-z': (value) => ({
    //           '--tw-translate-z': value,
    //           transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
    //         }), // this is actual CSS
    //       },
    //       { values: theme('translate'), supportsNegativeValues: true }
    //   )
    // })
  ],
}
