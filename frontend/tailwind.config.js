/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0b0f14',
          card: 'rgba(255,255,255,0.05)',
          border: '#1a2332',
          hover: 'rgba(255,255,255,0.08)',
        },
        neon: {
          green: '#00ffcc',
          greenDim: '#00cc9f',
          blue: '#00d4ff',
          blueDim: '#0099cc',
          purple: '#8b5cf6',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 255, 204, 0.15), 0 0 40px rgba(0, 255, 204, 0.08)',
        glowGreen: '0 0 30px rgba(0, 255, 204, 0.25), 0 0 60px rgba(0, 255, 204, 0.08)',
        glowBlue: '0 0 30px rgba(0, 212, 255, 0.2)',
        glowLg: '0 0 40px rgba(0, 255, 204, 0.2), 0 0 80px rgba(0, 212, 255, 0.1)',
        card: '0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
        premium: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        glass: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        shimmer: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 255, 204, 0.12)' },
          '50%': { opacity: '0.92', boxShadow: '0 0 36px rgba(0, 255, 204, 0.28)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
