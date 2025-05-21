import type { Meta, StoryObj } from '@storybook/react';

import Header from '../app/components/Header';

const meta = {
  title: "Components/Header",
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
