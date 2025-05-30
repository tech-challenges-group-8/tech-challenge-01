import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from "react-router-dom";

import Sidebar from '../app/components/Sidebar';

const meta = {
  title: "Components/Sidebar",
  component: Sidebar, decorators: [
    (Story) => (
      <MemoryRouter>
          <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};
