
import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in ms
  direction?: 'up' | 'left' | 'right';
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = 'up' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility based on intersection status
        // This allows the animation to play in reverse when scrolling away,
        // and re-play when scrolling back into view.
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before bottom
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up': return 'translate3d(0, 50px, 0)';
      case 'left': return 'translate3d(-50px, 0, 0)';
      case 'right': return 'translate3d(50px, 0, 0)';
      default: return 'translate3d(0, 50px, 0)';
    }
  };

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out will-change-transform transform-gpu`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        // Only apply delay when appearing, so disappearing feels responsive
        transitionDelay: isVisible ? `${delay}ms` : '0ms' 
      }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
