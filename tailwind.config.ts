import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      extend: {
        screens: {
          'size1/4': '400px',
          'size2/4': '600px',
          'sizeBig': '900px',
        },
        spacing: {
          'sizeBigHeight': '400px',
          'size2/4Height': '200px',
        },
      },
    },
  },
  plugins: [],
};
export default config;
