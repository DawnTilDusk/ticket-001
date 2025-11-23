
import React from 'react';
import { useLanguage } from './LanguageContext';
import RevealOnScroll from './RevealOnScroll';

const EndingCard: React.FC<{ title: string; desc: string; color: string; type: 'A' | 'B' | 'C'; image: string }> = ({ title, desc, color, type, image }) => {
  return (
    <div className="group relative h-96 border border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 bg-cyber-dark">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-30 transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
          style={{ backgroundImage: `url(${image})` }}
        />
        
        {/* Dark Gradient Overlay for Text Readability - Enhanced for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent opacity-100 transition-opacity duration-500"></div>

        {/* Color Accent Gradient on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500" 
             style={{background: `linear-gradient(to top, ${color}aa, transparent)`}}></div>
        
        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end relative z-10">
            <div className="font-display text-8xl text-white/5 absolute top-4 right-4 font-black select-none group-hover:text-white/10 transition-colors">
                {type}
            </div>
            
            <h3 className="font-display text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-lg shadow-black">
                <span style={{ color: color }} className="opacity-90 group-hover:opacity-100 transition-opacity block text-sm tracking-widest mb-1">{title.split('-')[0]}</span>
                <span className="block text-xl md:text-2xl">{title.split('-')[1]}</span>
            </h3>
            <p className="font-mono text-sm text-gray-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 drop-shadow-md leading-relaxed">
                {desc}
            </p>
            
            <div className="mt-6 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-in-out shadow-[0_0_15px_currentColor]" style={{backgroundColor: color, color: color}}></div>
        </div>

        {/* Glitch Effect Overlay */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 pointer-events-none mix-blend-overlay"></div>
    </div>
  );
};

const Endings: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-gradient-to-b from-cyber-dark to-cyber-black text-center px-6 relative overflow-hidden">
       {/* Ambient Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-neon-cyan/5 blur-[100px] rounded-full pointer-events-none"></div>

      <RevealOnScroll>
        <h2 className="font-display text-3xl md:text-4xl text-white mb-4 relative z-10">
            {t.endings.title} <span className="text-neon-red">{t.endings.title_highlight}</span>
        </h2>
        <p className="font-mono text-gray-500 mb-16 max-w-2xl mx-auto relative z-10">
            {t.endings.subtitle}
        </p>
      </RevealOnScroll>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 relative z-10">
        <RevealOnScroll delay={0}>
            <EndingCard 
                type="A"
                title={t.endings.a_title}
                desc={t.endings.a_desc}
                color="#A5F3FC" // Ice Blue - Order
                image="https://images.unsplash.com/photo-1519608487953-e9a368d431c2?auto=format&fit=crop&q=80"
            />
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
            <EndingCard 
                type="B"
                title={t.endings.b_title}
                desc={t.endings.b_desc}
                color="#EF4444" // Neon Red - Rebellion
                image="https://images.unsplash.com/photo-1565882915536-5f122598a931?auto=format&fit=crop&q=80"
            />
        </RevealOnScroll>
        <RevealOnScroll delay={400}>
            <EndingCard 
                type="C"
                title={t.endings.c_title}
                desc={t.endings.c_desc}
                color="#2DD4BF" // Teal - Decay/Low Tech
                image="https://images.unsplash.com/photo-1605218427368-35b089687909?auto=format&fit=crop&q=80"
            />
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Endings;
