import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as counterStore from '@/store/features/use-counter-store';
import { Counter } from '@/components/features/counter';

// Mock Zustand store
const mockStore = {
  count: 0,
  increment: vi.fn(),
  decrement: vi.fn(),
  reset: vi.fn(),
};

describe('Counter', () => {
  beforeEach(() => {
    vi.spyOn(counterStore, 'useCounterStore').mockReturnValue(mockStore);
    mockStore.count = 0;
    mockStore.increment.mockReset();
    mockStore.decrement.mockReset();
    mockStore.reset.mockReset();
  });

  it('renders the current count', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('calls increment when + button is clicked', () => {
    render(<Counter />);
    const buttons = screen.getAllByRole('button');
    const plusButton = buttons[1]; // Second button (index 1) is the plus button
    fireEvent.click(plusButton);
    expect(mockStore.increment).toHaveBeenCalled();
  });

  it('calls decrement when - button is clicked', () => {
    render(<Counter />);
    const buttons = screen.getAllByRole('button');
    const minusButton = buttons[0]; // First button (index 0) is the minus button
    fireEvent.click(minusButton);
    expect(mockStore.decrement).toHaveBeenCalled();
  });

  it('calls reset when Reset button is clicked', () => {
    render(<Counter />);
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    expect(mockStore.reset).toHaveBeenCalled();
  });
});
