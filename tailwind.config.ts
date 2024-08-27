import type { Config } from "tailwindcss";
import twAnimate from "tailwindcss-animate";

const fromVariable = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./app/**/*.{ts,tsx}"],
  future: { hoverOnlyWhenSupported: true },

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter, sans-serif", { fontFeatureSettings: '"cv11"' }],
      },
      borderColor: { DEFAULT: "hsl(var(--border))" },
      colors: {
        background: fromVariable("background"),
        foreground: fromVariable("foreground"),
        primary: {
          DEFAULT: fromVariable("primary"),
          foreground: fromVariable("primary-foreground"),
          muted: fromVariable("primary-muted"),
        },
        secondary: {
          DEFAULT: fromVariable("secondary"),
          foreground: fromVariable("secondary-foreground"),
        },
        destructive: {
          DEFAULT: fromVariable("destructive"),
          foreground: fromVariable("destructive-foreground"),
        },
        muted: {
          DEFAULT: fromVariable("muted"),
          foreground: fromVariable("muted-foreground"),
        },
        accent: {
          DEFAULT: fromVariable("accent"),
          foreground: fromVariable("accent-foreground"),
        },
        popover: {
          DEFAULT: fromVariable("popover"),
          foreground: fromVariable("popover-foreground"),
        },
        card: {
          DEFAULT: fromVariable("card"),
          foreground: fromVariable("card-foreground"),
        },
        border: fromVariable("border"),
        input: fromVariable("input"),
        ring: fromVariable("ring"),
      },
    },
  },
  plugins: [twAnimate],
} satisfies Config;
