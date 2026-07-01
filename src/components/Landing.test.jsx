import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Landing from './Landing';

describe('Landing', () => {
  it('renders the title, years, and subtitle', () => {
    render(<Landing title="Our Story" subtitle="years together" years={12} onEnter={() => {}} />);

    expect(screen.getByRole('heading', { level: 1, name: 'Our Story' })).toBeInTheDocument();
    expect(screen.getByText('12 years together')).toBeInTheDocument();
  });

  it('calls onEnter when the button is clicked', async () => {
    const onEnter = vi.fn();
    render(<Landing title="Title" subtitle="years" years={1} onEnter={onEnter} />);

    await userEvent.click(screen.getByRole('button', { name: /view our story/i }));

    expect(onEnter).toHaveBeenCalledTimes(1);
  });
});
