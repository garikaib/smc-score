/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    // Scope all tailwind styles to this ID
    important: '#smc-plugin',
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        logs: false, // Cleaner console
    },
    corePlugins: {
        preflight: false, // Disable global reset to avoid affecting host site
    }
}
