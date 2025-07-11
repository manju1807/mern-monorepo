import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Counter } from '@/components/features/counter';

const meta = {
  title: 'Features/Counter',
  component: Counter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
