const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        warning: {
          DEFAULT: "oklch(var(--warning))",
          foreground: "oklch(var(--warning-foreground))",
        },
        dialog: {
          overlay: "oklch(var(--dialog-overlay))",
          content: "oklch(var(--dialog-content))",
        },
        sheet: {
          overlay: "oklch(var(--sheet-overlay))",
          content: "oklch(var(--sheet-content))",
        },
        select: {
          trigger: "oklch(var(--select-trigger))",
          content: "oklch(var(--select-content))",
        },
        checkbox: {
          background: "oklch(var(--checkbox-background))",
          border: "oklch(var(--checkbox-border))",
          checked: "oklch(var(--checkbox-checked))",
        },
        radio: {
          background: "oklch(var(--radio-background))",
          border: "oklch(var(--radio-border))",
          checked: "oklch(var(--radio-checked))",
        },
        table: {
          header: "oklch(var(--table-header))",
          "row-even": "oklch(var(--table-row-even))",
          "row-odd": "oklch(var(--table-row-odd))",
        },
        sonner: {
          background: "oklch(var(--sonner-background))",
          foreground: "oklch(var(--sonner-foreground))",
          success: "oklch(var(--sonner-success))",
          error: "oklch(var(--sonner-error))",
          warning: "oklch(var(--sonner-warning))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

