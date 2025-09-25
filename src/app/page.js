'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PhotoDeck from '../components/PhotoDeck';

export default function Home() {
  const [config, setConfig] = useState(null);
  const [anniversaryYears, setAnniversaryYears] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(-1);
  const [visibleEvents, setVisibleEvents] = useState([]);
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
              setVisibleEvents(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
            // Trigger falling animation
            entry.target.classList.add('animate-fall');
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

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentEventIndex(-1);
  };

  const scrollUp = () => {
    if (currentEventIndex === 0) {
      scrollToHome();
    } else if (currentEventIndex > 0) {
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
        <div className="w-full py-0 timeline-line relative snap-y snap-mandatory h-screen overflow-y-auto">
          <div className="flex flex-col h-full">
            {config.timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                id={event.id}
                ref={(el) => (eventRefs.current[index] = el)}
                className={`timeline-event min-h-screen flex flex-col justify-center items-center snap-start py-12 event-bg-${index}`}
                initial={{ opacity: 0 }}
                animate={visibleEvents[index] || false ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-center mb-8 flex-shrink-0"
                  initial={{ opacity: 0, y: 50 }}
                  animate={visibleEvents[index] || false ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="font-playfair text-4xl font-bold">{event.title}</h2>
                  <h3 className="text-xl text-gray-500 mt-2">{event.subtitle}</h3>
                  <p className="text-md text-gray-400 mt-1">{event.location}</p>
                </motion.div>
                <PhotoDeck key={event.id} visible={visibleEvents[index] || false} images={event.media} caption={event.title} />
                {event.description && (
                  <motion.div
                    className="mt-8 flex-shrink-0 text-center text-lg max-w-xl mx-auto leading-relaxed px-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={visibleEvents[index] || false ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {event.description}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Navigation Arrows */}
        <div
          id="up-arrow"
          className={`nav-arrow ${currentEventIndex >= 0 ? 'visible' : ''}`}
          onClick={scrollUp}
        >
          <svg className="w-12 h-12 text-white bg-black bg-opacity-40 rounded-full p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
          </svg>
        </div>
        <div
          id="down-arrow"
          className={`nav-arrow ${(currentEventIndex < config.timelineEvents.length - 1 || currentEventIndex === -1) ? 'visible' : ''}`}
          onClick={currentEventIndex === -1 ? scrollToTimeline : scrollDown}
        >
          <svg className="w-12 h-12 text-white bg-black bg-opacity-40 rounded-full p-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </main>
    </div>
  );
}
