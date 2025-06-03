import type { Meta, StoryObj } from '@storybook/react';

import Header from '../app/components/Header';

import { withI18n } from './decorators/withI18n';
import { withUserContext } from './decorators/withUserContext';

const meta = {
  title: "Components/Header",
  component: Header,
  decorators: [withI18n, withUserContext],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
