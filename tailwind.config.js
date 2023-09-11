import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['FilsonProBook', ...defaultTheme.fontFamily.sans],
                'FilsonProBold': ['FilsonProBold', 'sans-serif']
            },
            colors: {
                defaultOrange: '#efaf1d',
                defaultBlue: '#1a89c2',
            }
        },
    },

    plugins: [forms],
};
