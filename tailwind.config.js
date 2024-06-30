/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        // screens: {
        //     sm: '480px',
        //     md: '768px',
        //     lg: '976px',
        //     xl: '1440px',
        // },
        colors: {
            primary: 'var(--color-primary)',
            secondary: 'var(--color-secondary)',
            tertiary: 'var(--color-tertiary)',
            background: 'var(--color-background)',
            black: 'var(--color-black)',
            white: 'var(--color-white)',
            gray: 'var(--color-gray)',
            error: 'var(--color-error)',
            warning: 'var(--color-warning)',
            success: 'var(--color-success)'
        },
        // fontFamily: {
        //     sans: ['Graphik', 'sans-serif'],
        //     serif: ['Merriweather', 'serif'],
        // },
        // extend: {
        //     spacing: {
        //         '128': '32rem',
        //         '144': '36rem',
        //     },
        //     borderRadius: {
        //         '4xl': '2rem',
        //     }
        // }

    },
    plugins: [],
}

