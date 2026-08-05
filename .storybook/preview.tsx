import type { Preview } from '@storybook/react';

import { ThemeProvider } from '../src/components/themeProvider/ThemeProvider';
import { themes } from '../src/components/themeProvider/themeContext';
import { theme } from './theme';

import '../src/index.css';
import '../dist/style.css';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const current = (context.globals.theme as (typeof themes)[number]) || 'light';
      return (
        <ThemeProvider theme={current}>
          <Story />
        </ThemeProvider>
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
