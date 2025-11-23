
import React, { useRef } from 'react';
import GlitchText from './GlitchText';
import { useLanguage } from './LanguageContext';
import RevealOnScroll from './RevealOnScroll';

const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bgRef.current) return;
    
    // Performance Optimization: Direct DOM manipulation avoids React render cycle
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    
    bgRef.current.style.transform = `translate(${-x}px, ${-y}px) scale(1.1)`;
  };

  return (
    <section 
      id="hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-cyber-black"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Layer */}
      <div 
        ref={bgRef}
        className="absolute inset-0 opacity-60 transition-transform duration-75 ease-out will-change-transform"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2613&auto=format&fit=crop)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4) saturate(0.8) contrast(140%) hue-rotate(10deg)',
          transform: 'scale(1.1)' // Initial scale
        }}
      />
      
      {/* Blue Overlay Glitch */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none z-[6]"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            #3B82F6 2px,
            #3B82F6 4px
          )`
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <RevealOnScroll delay={0}>
            <div className="mb-6 font-display font-black text-5xl md:text-8xl tracking-tighter text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                <GlitchText text={t.hero.title} hoverTrigger={false} interval={100} />
            </div>
        </RevealOnScroll>
        
        <RevealOnScroll delay={200}>
            <h2 className="font-mono text-neon-cyan text-lg md:text-xl mb-8 tracking-widest border-y border-neon-cyan/30 py-4">
              <GlitchText text={t.hero.slogan} />
            </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
            <p className="font-sans text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              {t.hero.desc_p1}<br/>
              <span className="text-white font-bold bg-neon-red/20 px-1">{t.hero.desc_highlight}</span>
            </p>
        </RevealOnScroll>

        <RevealOnScroll delay={600}>
            <a href="#conflict" className="group relative inline-flex items-center justify-center px-8 py-4 font-display font-bold text-white transition-all duration-200 bg-transparent border-2 border-neon-green hover:bg-neon-green/10 focus:outline-none">
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                <span className="relative group-hover:text-neon-green transition-colors">{t.hero.button}</span>
                <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </a>
        </RevealOnScroll>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-cyber-black/60 to-cyber-black" style={{background: 'radial-gradient(circle, transparent 30%, #020617 100%)'}} />
    </section>
  );
};

export default Hero;