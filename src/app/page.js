'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const [config, setConfig] = useState(null);
  const [anniversaryYears, setAnniversaryYears] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(-1);
  const timelineRef = useRef(null);
  const eventRefs = useRef([]);

  useEffect(() => {
    fetch('/config.json')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        const now = new Date();
        const annivDateStr = process.env.NEXT_PUBLIC_ANIVERSARY_DATE || data.anniversaryDate;
        const annivDate = new Date(annivDateStr);
        const years = now.getFullYear() - annivDate.getFullYear();
        setAnniversaryYears(years);
      });
  }, []);

  useEffect(() => {
    if (!config || !timelineRef.current) return;

    const events = eventRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = eventRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setCurrentEventIndex(index);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    events.forEach((event) => observer.observe(event));

    return () => observer.disconnect();
  }, [config]);

  // Dynamic title update based on current view
  useEffect(() => {
    if (!config) return;

    let title;
    if (currentEventIndex === -1) {
      title = `Our Anniversary: ${anniversaryYears} years! - ${config.siteTitle}`;
    } else {
      const event = config.timelineEvents[currentEventIndex];
      title = `${event.title} - ${config.siteTitle}`;
    }
    document.title = title;
  }, [currentEventIndex, config, anniversaryYears]);

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: 'smooth' });
    // After scrolling to timeline, set to first event if available
    setTimeout(() => {
      if (config.timelineEvents.length > 0 && currentEventIndex === -1) {
        setCurrentEventIndex(0);
      }
    }, 500);
  };

  const scrollToEvent = (index) => {
    eventRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
    // Force update index after scroll to ensure navigation sync
    setTimeout(() => {
      setCurrentEventIndex(index);
    }, 300);
  };

  const scrollUp = () => {
    if (currentEventIndex > 0) {
      scrollToEvent(currentEventIndex - 1);
    }
  };

  const scrollDown = () => {
    if (currentEventIndex < config.timelineEvents.length - 1) {
      scrollToEvent(currentEventIndex + 1);
    }
  };

  if (!config) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="bg-[#FFF8F0] text-gray-800 min-h-screen">
      {/* Landing Screen */}
      <section className="h-screen w-full flex flex-col items-center justify-center text-center p-4 text-white landing-screen relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold tracking-tight">Our Anniversary</h1>
          <p className="font-dancing-script text-4xl md:text-6xl mt-4 mb-8">{anniversaryYears} years!</p>
          <button
            onClick={scrollToTimeline}
            className="bg-white text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-300"
          >
            View Our Story
          </button>
        </div>
      </section>

      {/* Timeline Section */}
      <main ref={timelineRef} className="relative overflow-hidden">
        {/* Timeline Navigation (Side) - Desktop */}
        <aside className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 hidden md:block">
          <div className="flex flex-col items-center space-y-6">
            {config.timelineEvents.map((event, index) => (
              <div key={event.id} className="relative group">
                <a 
                  href={`#${event.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToEvent(index); }}
                  className={`block w-4 h-4 bg-gray-400 rounded-full timeline-nav-dot ${currentEventIndex === index ? 'active' : ''}`}
                ></a>
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {event.title}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Vertical Timeline */}
        <div className="container mx-auto px-4 py-0 timeline-line relative snap-y snap-mandatory h-screen overflow-y-auto">
          <div className="flex flex-col h-full">
            {config.timelineEvents.map((event, index) => (
              <div
                key={event.id}
                id={event.id}
                ref={(el) => (eventRefs.current[index] = el)}
                className="timeline-event min-h-screen flex flex-col justify-center items-center snap-start py-12"
              >
                <div className="text-center mb-8 flex-shrink-0">
                  <h2 className="font-playfair text-4xl font-bold">{event.title}</h2>
                  <h3 className="text-xl text-gray-500 mt-2">{event.subtitle}</h3>
                  <p className="text-md text-gray-400 mt-1">{event.location}</p>
                </div>
                <div className="flex-1 flex items-center justify-center w-full max-w-4xl px-4">
                  <div className={`grid grid-cols-1 md:grid-cols-${event.media.length > 2 ? 3 : 2} gap-8 items-center justify-items-center w-full`}>
                    {event.media.map((src, i) => (
                      <div
                        key={i}
                        className="relative w-[600px] h-[400px] max-w-full mx-auto polaroid flex-shrink-0"
                        style={{ transform: `rotate(${i % 2 === 0 ? '-' : ''}${2 + Math.random() * 4}deg)` }}
                      >
                        <Image src={src} alt={event.title} fill className="object-cover rounded" />
                        <p className="caption font-dancing-script text-xl">{event.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {event.description && (
                  <div className="mt-8 flex-shrink-0 text-center text-lg max-w-xl mx-auto leading-relaxed px-4">
                    {event.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Floating Navigation Arrows */}
        <div 
          id="up-arrow" 
          className={`nav-arrow ${currentEventIndex > 0 ? 'visible' : ''}`}
          onClick={scrollUp}
        >
          <svg className="w-12 h-12 text-white bg-black bg-opacity-40 rounded-full p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
          </svg>
        </div>
        <div 
          id="down-arrow" 
          className={`nav-arrow ${currentEventIndex < config.timelineEvents.length - 1 && currentEventIndex !== -1 ? 'visible' : ''}`}
          onClick={scrollDown}
        >
          <svg className="w-12 h-12 text-white bg-black bg-opacity-40 rounded-full p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </main>
    </div>
  );
}
