/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class', // Включаем поддержку темной темы через класс
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mulish': ['Mulish', 'sans-serif'],
        'valera': ['Varela', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

