
import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import RevealOnScroll from './RevealOnScroll';

const CTA: React.FC = () => {
  const { t } = useLanguage();
  const [btnText, setBtnText] = useState(t.cta.btn_default);
  const [glitching, setGlitching] = useState(false);

  // Update button text when language changes
  useEffect(() => {
    if (!glitching) {
        setBtnText(t.cta.btn_default);
    }
  }, [t, glitching]);

  const playClickSound = () => {
    // Simple synth for a sharp, mechanical UI click
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square'; // Cyberpunk-ish gritty wave
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  const handleHover = () => {
    if (glitching) return;
    setGlitching(true);
    setBtnText(t.cta.btn_error);
    
    // Rapidly swap text
    const interval = setInterval(() => {
        const r = Math.random();
        if (r > 0.6) setBtnText(t.cta.btn_glitch_1);
        else if (r > 0.3) setBtnText(t.cta.btn_glitch_2);
        else setBtnText(t.cta.btn_glitch_3);
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        setBtnText(t.cta.btn_default);
        setGlitching(false);
    }, 2000);
  };

  const handleClick = () => {
    playClickSound();
    // Additional click logic could go here
  };

  return (
    <section id="cta" className="py-32 bg-cyber-black relative flex flex-col items-center justify-center text-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-red/10 via-transparent to-transparent opacity-50"></div>
      
      <RevealOnScroll>
        <h2 className="font-display text-4xl md:text-6xl text-white mb-8 relative z-10">
            {t.cta.main_line1} <br/>
            <span className="text-neon-red">{t.cta.main_highlight}</span>
        </h2>
      </RevealOnScroll>

      <div className="relative z-10 group">
        {/* Interference Warning Text */}
        <div className={`absolute -top-12 left-1/2 -translate-x-1/2 font-mono text-sm font-bold tracking-widest whitespace-nowrap transition-all duration-200 ${glitching ? 'opacity-100 text-neon-red animate-pulse translate-y-0' : 'opacity-0 translate-y-2'}`}>
            {t.cta.warning}
        </div>

        <RevealOnScroll delay={200}>
            <button 
                onMouseEnter={handleHover}
                onClick={handleClick}
                className={`
                    relative overflow-hidden px-12 py-6 font-display font-bold text-xl tracking-widest border-2 transition-all duration-100 z-20 active:scale-95
                    ${glitching 
                        ? 'bg-neon-red text-black border-neon-red scale-110 animate-shake shadow-[0_0_30px_rgba(59,130,246,0.8)]' 
                        : 'bg-transparent text-neon-cyan border-neon-cyan hover:bg-neon-cyan/10 hover:scale-105 hover:shadow-[0_0_20px_rgba(165,243,252,0.4)]'
                    }
                `}
            >
                {/* Glitch Lines Inside Button */}
                {glitching && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-overlay">
                        <div className="w-full h-[2px] bg-white absolute top-[20%] left-0 animate-[glitch_0.3s_linear_infinite]"></div>
                        <div className="w-full h-[4px] bg-black absolute top-[60%] left-0 animate-[glitch_0.2s_linear_infinite_reverse]"></div>
                    </div>
                )}
                {btnText}
            </button>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={400}>
        <div className="mt-16 flex space-x-8 text-gray-500 relative z-10">
            <a href="#" className="hover:text-neon-cyan transition-colors">DISCORD</a>
            <a href="#" className="hover:text-neon-cyan transition-colors">STEAM</a>
            <a href="#" className="hover:text-neon-cyan transition-colors">TWITTER</a>
        </div>
      </RevealOnScroll>
      
      <footer className="mt-24 text-gray-700 text-xs font-mono">
        {t.cta.footer_rights}<br/>
        {t.cta.footer_prop}
      </footer>
    </section>
  );
};

export default CTA;
