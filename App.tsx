
import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Conflict from './components/Conflict';
import Gameplay from './components/Gameplay';
import Endings from './components/Endings';
import WorldLore from './components/WorldLore';
import CTA from './components/CTA';
import AudioController from './components/AudioController';
import { LanguageProvider } from './components/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="bg-cyber-black min-h-screen text-white selection:bg-neon-red selection:text-black relative">
        
        {/* Background Animations */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
          
          {/* CRT Flicker Layer */}
          <div className="absolute inset-0 bg-white opacity-[0.02] animate-crt-flicker pointer-events-none"></div>

          {/* Moving Scanline */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent animate-[scanline_8s_linear_infinite]"></div>
        </div>

        <Navigation />
        <AudioController />
        
        <main className="relative z-10">
          <Hero />
          <Conflict />
          <Gameplay />
          <WorldLore />
          <Endings />
          <CTA />
        </main>
        
        {/* Global Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-overlay" 
             style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise.png")'}}>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default App;
