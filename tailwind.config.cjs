const colors = require("tailwindcss/colors");

const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        gray: colors.warmGray,
        blue: colors.sky
      }
    }
  },

  plugins: []
};

module.exports = config;
