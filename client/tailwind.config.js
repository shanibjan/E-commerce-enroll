/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add this line
  ],
  theme: {
    screens: {
      'phone':'425px',
      'tablet': '640px',
      'ipad': '768px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      'bige':'1440px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      maxWidth: {
        'custom': '1024px', // Custom maximum width value
        'custom-xl': '60rem', // Another custom value
      }
    },
    fontFamily: {
     
      gordita: ["GorditaRegular"],
      gorditaBold: ["GorditaBold"],
      gorditaMedium: ["GorditaMedium"],
    },
  },
  plugins: [],
}
