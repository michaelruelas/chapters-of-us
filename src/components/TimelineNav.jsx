'use client';

export default function TimelineNav({ events, activeIndex, onSelect }) {
  if (!events?.length) return null;

  return (
    <aside className="fixed top-1/2 right-4 z-20 hidden -translate-y-1/2 md:right-15 md:block">
      <nav aria-label="Timeline chapters" className="flex flex-col items-center space-y-4">
        {events.map((event, index) => {
          const isActive = index === activeIndex;
          return (
            <div key={event.id} className="group relative">
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-label={`Jump to ${event.title}`}
                aria-current={isActive ? 'step' : undefined}
                className={`timeline-nav-dot block h-4 w-4 rounded-full bg-[var(--topcoat-gray)] shadow-md shadow-black/50 ${
                  isActive ? 'active' : ''
                }`}
              />
              <div className="pointer-events-none absolute top-1/2 right-full mr-4 -translate-y-1/2 rounded-md bg-[var(--primary)] px-3 py-1 text-sm whitespace-nowrap text-[var(--topcoat-gray)] opacity-0 transition-opacity group-hover:opacity-100">
                {event.title}
                <div className="absolute top-1/2 left-full h-2 w-2 -translate-y-1/2 rotate-45 bg-[var(--primary)]" />
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
