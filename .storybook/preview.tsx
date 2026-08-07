import type { Preview } from '@storybook/react';
import { useLayoutEffect } from 'react';

import { ThemeProvider } from '../src/components/themeProvider/ThemeProvider';
import { themes } from '../src/components/themeProvider/themeContext';
import { theme } from './theme';

import '../src/index.css';
import '../dist/style.css';

const NebulaThemed = ({ value, children }: { value: (typeof themes)[number]; children: React.ReactNode }) => {
  useLayoutEffect(() => {
    // Reflect the theme on <html> so the preview canvas/body background
    // follows the light/dark toggle (the provider still themes the story).
    document.documentElement.setAttribute('data-nb-theme', value);
  }, [value]);

  return <ThemeProvider theme={value}>{children}</ThemeProvider>;
};

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const current = (context.globals.theme as (typeof themes)[number]) || 'light';
      return (
        <NebulaThemed value={current}>
          <Story />
        </NebulaThemed>
      );
    },
  ],
  globalTypes: {
    theme: {
      description: 'Nebula theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme,
    },
  },
};

export default preview;
