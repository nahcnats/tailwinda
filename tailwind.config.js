/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2563eb",
                primaryAccent: "#1e40af",
                secondary: "#4f46e5",
                secondaryAccent: "#c7d2fe",
                inActive: "#9ca3af",
            },
        },
    },
    plugins: [require("@tailwindcss/aspect-ratio")],
};
