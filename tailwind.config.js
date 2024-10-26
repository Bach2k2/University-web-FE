/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        header:'#000054',
        'primary': '#C33C54',
        'on-primary': '#FFFFFF',
        'surface': '#B8F3FF',
        'surface-dim': '#DED8E1',
        'tertiary-light': '#F6F6FF',
        'tertiary-60': '#4E57A9',
        'default-layout': '#E4ECF2'
      }
    },
  },
  plugins: [],
}

