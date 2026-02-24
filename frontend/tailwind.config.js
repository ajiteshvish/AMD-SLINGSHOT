/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
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
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "fade-in": {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                "slide-in-from-bottom-10": {
                    from: { transform: "translateY(10px)" },
                    to: { transform: "translateY(0)" },
                },
                "shimmer-slide": {
                    to: { transform: "translate(calc(100cqw - 100%), 0)" },
                },
                "spin-around": {
                    "0%": { transform: "translateZ(0) rotate(0)" },
                    "15%, 35%": { transform: "translateZ(0) rotate(90deg)" },
                    "65%, 85%": { transform: "translateZ(0) rotate(270deg)" },
                    "100%": { transform: "translateZ(0) rotate(360deg)" },
                },
            },
            animation: {
                in: "fade-in 0.5s ease-out",
                "shimmer-slide": "shimmer-slide var(--speed) ease-in-out infinite alternate",
                "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
            },
        },
    },
    plugins: [],
}
