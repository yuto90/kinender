module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // 任意の色を設定
      "vue-green": "#42b983",
      "vue-black": "#2c3e50",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
