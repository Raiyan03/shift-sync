/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'bg': "#104547",
        // 'bg': "#CE796B",
        'bgSoft': '#4B5358',
        // 'bgSoft': '#000',

        'buttonColor': "#5d57c9" , 
        'text': "#E0DFD5",
        'textSoft': "#E8E9EB",
        'compUser': "#E0DFD5",
        'logOutButton': "#C56F6F",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  "baseUrl": "./",
  "paths": {
    "@/*": ["*"]
  }
};
