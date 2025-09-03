/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          50: "#f0f7ff",
          100: "#e0efff",
          200: "#b8dfff",
          300: "#79c7ff",
          400: "#4A90E2", // Main primary color
          500: "#1d7aff",
          600: "#0060ff",
          700: "#0052eb",
          800: "#0043bf",
          900: "#003a99",
          DEFAULT: "#4A90E2",
          foreground: "#ffffff",
        },
        // Success colors
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#28A745", // Main success color
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        // Warning colors
        warning: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#FD7E14", // Main warning color
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        // Danger colors
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#DC3545", // Main danger color
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        // Basic colors for shadcn compatibility
        background: "#ffffff",
        foreground: "#333333",
        card: "#ffffff",
        "card-foreground": "#333333",
        popover: "#ffffff",
        "popover-foreground": "#333333",
        secondary: "#f8f9fa",
        "secondary-foreground": "#333333",
        muted: "#f8f9fa",
        "muted-foreground": "#777777",
        accent: "#f5f5f5",
        "accent-foreground": "#333333",
        destructive: "#dc3545",
        "destructive-foreground": "#ffffff",
        border: "#e0e0e0",
        input: "#e0e0e0",
        ring: "#4A90E2",
      },
      fontFamily: {
        heading: ["Inter", "Poppins", "system-ui", "sans-serif"],
        body: ["Roboto", "Open Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "card-hover":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        elevated:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
