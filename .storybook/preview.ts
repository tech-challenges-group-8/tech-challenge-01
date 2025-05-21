import type { Preview } from '@storybook/react'
import "../src/app/globals.css";
import { withI18n } from "../src/stories/decorators/withI18n";
import { withTheme } from "../src/stories/decorators/withTheme"; 

export const decorators = [withI18n, withTheme];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;