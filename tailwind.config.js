module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        '$dark': '#202339',
        '$light': '#F8F8FF',
        '$dark-nav': '#171B30',
        '$light-nav': '#EBECF1',
        '$dark-action': '#DBEFEE',
        '$light-action': '#202339'
      },
    },
  },
  plugins: [],
};
