
import React from 'react';
import { useLanguage } from './LanguageContext';
import RevealOnScroll from './RevealOnScroll';

const Conflict: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="conflict" className="py-24 bg-cyber-dark relative overflow-hidden">
      {/* HUD Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-red to-transparent opacity-50" />

      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        <RevealOnScroll direction="left">
          <div className="space-y-8">
            <h2 className="font-display text-4xl md:text-5xl text-white font-bold">
              <span className="text-neon-red">{t.conflict.title_highlight}</span>{t.conflict.title_suffix}
            </h2>
            <p className="font-mono text-neon-cyan text-sm border-l-2 border-neon-cyan pl-4">
              {t.conflict.status_obj} | {t.conflict.status_state}
            </p>
            
            <div className="font-sans text-gray-300 text-lg leading-loose space-y-4">
              <p>
                {t.conflict.body_p1}
              </p>
              <div className="text-sm text-neon-red/80 font-mono bg-neon-red/10 p-3 border border-neon-red/20 rounded">
                  {t.conflict.system_notice}
              </div>
            </div>

            <div className="p-6 bg-cyber-gray border border-white/10 rounded-sm relative group">
               <div className="absolute top-0 right-0 p-2 text-xs text-gray-500 font-mono">{t.conflict.log_id}</div>
               <p className="italic text-gray-400 font-serif">
                 {t.conflict.log_text}
               </p>
               <div className="mt-4 h-1 w-full bg-gray-800 overflow-hidden">
                 <div className="h-full bg-neon-red w-1/3 animate-pulse"></div>
               </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="right" delay={200}>
          <div className="relative group">
              <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img 
                src="https://images.unsplash.com/photo-1618123069754-cd64c2321005?q=80&w=2864&auto=format&fit=crop" 
                alt="Gritty Living Quarters" 
                className="relative z-10 rounded border border-white/10 w-full object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                style={{ filter: 'brightness(0.7) contrast(1.2)' }}
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-neon-red opacity-50"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-neon-cyan opacity-50"></div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Conflict;
