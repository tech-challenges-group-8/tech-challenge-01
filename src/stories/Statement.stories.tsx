import type { Meta, StoryObj } from '@storybook/react';

import Statement from '../app/components/Statement';

import { withI18n } from './decorators/withI18n';
import { withTheme } from './decorators/withTheme';
import { withUserContext } from './decorators/withUserContext';

const meta = {
  title: 'Components/Statement',
  component: Statement,
  decorators: [withTheme, withI18n, withUserContext],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Statement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
