import type { Config } from 'tailwindcss';

import tailwindcssAnimated from 'tailwindcss-animated';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [tailwindcssAnimated],
  theme: {
    extend: {
      fontFamily: {
        nokora: ['Nokora', ...fontFamily.sans],
      },
    },
    fontFamily: {
      sans: ['articulat-cf', ...fontFamily.sans],
    },
    fontSize: {
      base: ['16px', '19.2px'],
      lg: ['18px', '19.44px'],
      sm: ['14px', '16.8px'],
      xl: ['32px', '38.4px'],
      xs: ['12px', '14.4px'],
    },
  },
} satisfies Config;
