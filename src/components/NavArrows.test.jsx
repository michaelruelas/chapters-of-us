import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavArrows from './NavArrows';

describe('NavArrows', () => {
  const noop = () => {};

  it('renders both arrow buttons with accessible labels', () => {
    render(<NavArrows onUp={noop} onDown={noop} upVisible={true} downVisible={true} />);

    expect(screen.getByRole('button', { name: /previous chapter/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next chapter/i })).toBeInTheDocument();
  });

  it('fires onUp and onDown callbacks', async () => {
    const onUp = vi.fn();
    const onDown = vi.fn();
    render(<NavArrows onUp={onUp} onDown={onDown} upVisible={true} downVisible={true} />);

    await userEvent.click(screen.getByRole('button', { name: /previous chapter/i }));
    await userEvent.click(screen.getByRole('button', { name: /next chapter/i }));

    expect(onUp).toHaveBeenCalledTimes(1);
    expect(onDown).toHaveBeenCalledTimes(1);
  });
});
