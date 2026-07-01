'use client';

const ChevronUp = (props) => (
  <svg
    className="bg-opacity-40 h-12 w-12 rounded-full bg-[var(--primary)] p-2 text-[var(--topcoat-white)]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ChevronDown = (props) => (
  <svg
    className="bg-opacity-40 h-12 w-12 rounded-full bg-[var(--primary)] p-2 text-[var(--topcoat-white)]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function NavArrows({ onUp, onDown, upVisible, downVisible }) {
  return (
    <>
      <button
        type="button"
        aria-label="Previous chapter"
        onClick={onUp}
        className={`nav-arrow fixed top-2 right-1/2 z-20 translate-x-1/2 ${upVisible ? 'visible' : ''}`}
      >
        <ChevronUp />
      </button>
      <button
        type="button"
        aria-label="Next chapter"
        onClick={onDown}
        className={`nav-arrow fixed right-1/2 bottom-2 z-20 translate-x-1/2 ${downVisible ? 'visible' : ''}`}
      >
        <ChevronDown />
      </button>
    </>
  );
}
