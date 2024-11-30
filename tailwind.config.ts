import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-main": "#f5f5f5",
        "bg-primary": "#FFFFFF",
        "bg-secondary": "#F9FAFB",
        "fg-quaternary": "#667085",
        "text-primary": "#101828",
        "text-secondary": "#344054",
        "text-tertiary": "#475467",
        "text-placeholder": "#667085",
        "border-primary": "#D0D5DD",
        "border-secondary": "#EAECF0",
        "utility-brand-50": "#F9F5FF",
        "utility-brand-200": "#E9D7FE",
        "utility-brand-700": "#6941C6",
        "utility-gray-50": "#F9FAFB",
        "utility-gray-200": "#EAECF0",
        "utility-gray-700": "#344054",
        "button-primary-bg": "#7F56D9",
        "button-primary-fg": "#FFFFFF",
        "button-primary-border": "#7F56D9",
        "button-secondary-bg": "#FFFFFF",
        "button-secondary-fg": "#344054",
        "button-tertiary-fg": "#475467",
        "button-secondary-border": "#D0D5DD",
        "button-secondary-color-bg": "#FFFFFF",
        "button-secondary-color-fg": "#6941C6",
        "button-secondary-color-border": "#D6BBFB",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif"],
      },
      borderWidth: {
        DEFAULT: "1px",
      },
    },
  },
  plugins: [],
} satisfies Config;
