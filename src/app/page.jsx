'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Landing from '../components/Landing';
import TimelineEvent from '../components/TimelineEvent';
import TimelineNav from '../components/TimelineNav';
import NavArrows from '../components/NavArrows';
import { siteConfig, getAnniversaryYears } from '../lib/config';

const LANDING_INDEX = -1;

export default function Home() {
  const timelineRef = useRef(null);
  const eventRefs = useRef([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(LANDING_INDEX);

  const years = getAnniversaryYears(process.env.NEXT_PUBLIC_ANNIVERSARY_DATE);
  const events = siteConfig.timelineEvents;

  useEffect(() => {
    document.documentElement.classList.add(`theme-${siteConfig.theme}`);
  }, []);

  useEffect(() => {
    if (currentEventIndex === LANDING_INDEX) {
      document.title = `Our Story: ${years} years - ${siteConfig.siteTitle}`;
      return;
    }
    const event = events[currentEventIndex];
    document.title = event ? `${event.title} - ${siteConfig.siteTitle}` : siteConfig.siteTitle;
  }, [currentEventIndex, events, years]);

  const registerEventRef = useCallback(
    (index) => (el) => {
      eventRefs.current[index] = el;
    },
    [],
  );

  const handleEventEnter = useCallback((index) => {
    setCurrentEventIndex(index);
  }, []);

  const enterTimeline = useCallback(() => {
    timelineRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const goToLanding = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentEventIndex(LANDING_INDEX);
  }, []);

  const goToEvent = useCallback((index) => {
    eventRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const goUp = useCallback(() => {
    if (currentEventIndex === 0) {
      goToLanding();
    } else if (currentEventIndex > 0) {
      goToEvent(currentEventIndex - 1);
    }
  }, [currentEventIndex, goToEvent, goToLanding]);

  const goDown = useCallback(() => {
    if (currentEventIndex === LANDING_INDEX) {
      enterTimeline();
      setCurrentEventIndex(0);
      return;
    }
    if (currentEventIndex < events.length - 1) {
      goToEvent(currentEventIndex + 1);
    }
  }, [currentEventIndex, events.length, enterTimeline, goToEvent]);

  const upVisible = currentEventIndex >= 0;
  const downVisible = currentEventIndex < events.length - 1 || currentEventIndex === LANDING_INDEX;

  return (
    <div className="min-h-screen">
      <Landing
        title={siteConfig.landingTitle}
        subtitle={siteConfig.landingSubtitle}
        years={years}
        onEnter={enterTimeline}
      />

      <main ref={timelineRef} className="relative">
        <TimelineNav events={events} activeIndex={currentEventIndex} onSelect={goToEvent} />

        <div className="timeline-line relative h-screen w-full snap-y snap-mandatory overflow-y-auto">
          <div className="flex h-full flex-col">
            {events.map((event, index) => (
              <TimelineEvent
                key={event.id}
                event={event}
                index={index}
                registerRef={registerEventRef(index)}
                onEnter={handleEventEnter}
              />
            ))}
          </div>
        </div>

        <NavArrows onUp={goUp} onDown={goDown} upVisible={upVisible} downVisible={downVisible} />
      </main>
    </div>
  );
}
