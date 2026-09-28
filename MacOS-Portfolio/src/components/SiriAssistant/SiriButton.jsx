import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';


const SiriButton = ({ onClick, isActive }) => {
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current) return;
    if (isActive) {
      gsap.to(buttonRef.current, { scale: 0, opacity: 0, duration: 0.3, pointerEvents: 'none' });
    } else {
      gsap.to(buttonRef.current, { scale: 1, opacity: 1, duration: 0.3, pointerEvents: 'auto' });
    }
  }, [isActive]);

  const handleMouseEnter = () => {
    if (isActive) return;
    gsap.to(buttonRef.current, { scale: 1.12, duration: 0.25, ease: 'back.out' });
    if (tooltipRef.current)
      gsap.fromTo(tooltipRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.25, ease: 'back.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, { scale: 1, duration: 0.25, ease: 'back.out' });
    if (tooltipRef.current)
      gsap.to(tooltipRef.current, { opacity: 0, y: 8, duration: 0.2 });
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3">
      <div
        ref={tooltipRef}
        className="opacity-0 pointer-events-none bg-white/90 backdrop-blur-md text-gray-900 text-sm px-4 py-2 rounded-full whitespace-nowrap shadow-lg"
      >
        Hi, How can I help?
      </div>

      <button
        ref={buttonRef}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="size-16 flex-center rounded-full overflow-hidden shadow-xl transition-shadow active:scale-95"
        aria-label="Open Siri Assistant"
        style={{ boxShadow: '0 0 24px rgba(88,86,214,0.5), 0 4px 24px rgba(0,0,0,0.6)' }}
      >
        <img src="/icons/Siri Logo.gif" alt="Siri" className="w-full h-full object-cover" />
      </button>
    </div>
  );
};

export default SiriButton;
