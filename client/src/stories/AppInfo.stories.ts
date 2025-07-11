import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AppInfo } from '@/components/features/app-info';

const meta = {
  title: 'Features/AppInfo',
  component: AppInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
