import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#243144',
        'grey-1': '#F4F6F8',
        'grey-2': '#F3F4F6',
        'error': '#ef4444',
        'green-1': 	'#00BFA5'
      },
      screens: {
        sm: '0px',       // Mobile
        md: '600px',     // Tablet  
        lg: '900px',     // Desktop
      },
    },
  },
  plugins: [],
};
export default config;
