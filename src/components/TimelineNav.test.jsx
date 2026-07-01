import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TimelineNav from './TimelineNav';

const EVENTS = [
  { id: 'event-1', title: 'First Met' },
  { id: 'event-2', title: 'Proposal' },
  { id: 'event-3', title: 'Wedding' },
];

describe('TimelineNav', () => {
  it('renders nothing when there are no events', () => {
    const { container } = render(<TimelineNav events={[]} activeIndex={-1} onSelect={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a button per event with accessible labels', () => {
    render(<TimelineNav events={EVENTS} activeIndex={-1} onSelect={() => {}} />);

    expect(screen.getByRole('button', { name: /jump to first met/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /jump to proposal/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /jump to wedding/i })).toBeInTheDocument();
  });

  it('marks the active event with aria-current', () => {
    render(<TimelineNav events={EVENTS} activeIndex={1} onSelect={() => {}} />);

    expect(screen.getByRole('button', { name: /jump to proposal/i })).toHaveAttribute(
      'aria-current',
      'step',
    );
    expect(screen.getByRole('button', { name: /jump to first met/i })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('fires onSelect with the event index', async () => {
    const onSelect = vi.fn();
    render(<TimelineNav events={EVENTS} activeIndex={-1} onSelect={onSelect} />);

    await userEvent.click(screen.getByRole('button', { name: /jump to wedding/i }));

    expect(onSelect).toHaveBeenCalledWith(2);
  });
});
