import type { Preview } from '@storybook/react';

import { theme } from './theme';

import '../dist/style.css';

const preview: Preview = {
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
