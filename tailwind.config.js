/** @type {import('tailwindcss').Config} */
module.exports = {
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
        // Add your custom theme extensions here
      },
    },
    plugins: [],
    // If you want to use Tailwind alongside Bootstrap,
    // you might want to disable Tailwind's preflight
    // to avoid conflicts
    corePlugins: {
      preflight: false,
    }
}