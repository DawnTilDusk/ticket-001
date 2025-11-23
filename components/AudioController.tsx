
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

const AudioController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { t } = useLanguage();

  // Dark Industrial / Cyberpunk Ambience
  // Source: Archive.org - "Distorted Reality" (Public Domain / CC)
  const MUSIC_URL = "https://ia800100.us.archive.org/3/items/mythium/03_-_Distorted_Reality.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio 
        ref={audioRef} 
        src={MUSIC_URL} 
        loop 
        preload="auto"
      />

      {/* Volume Slider Container - Slides in when hovered or active */}
      <div className={`
        bg-cyber-black border border-neon-cyan/30 p-3 rounded mb-2 transition-all duration-300 origin-bottom-right
        ${isHovered && isPlaying ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}
      `}>
         <div className="flex items-center gap-3 h-32 flex-col">
            <div className="text-[10px] text-neon-cyan font-mono writing-vertical-rl rotate-180">
                {t.audio.gain}
            </div>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05" 
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="h-24 -rotate-90 w-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
              style={{
                WebkitAppearance: 'slider-vertical', // For wider browser support on vertical range
              }}
            />
            <div className="font-mono text-xs text-neon-cyan w-6 text-center">
                {Math.round(volume * 100)}
            </div>
         </div>
      </div>

      {/* Main Toggle Button */}
      <button 
        onClick={togglePlay}
        className={`
            group relative flex items-center justify-center w-14 h-14 
            border-2 transition-all duration-300 backdrop-blur-md
            ${isPlaying 
                ? 'border-neon-cyan bg-neon-cyan/10 shadow-[0_0_15px_rgba(165,243,252,0.3)]' 
                : 'border-gray-600 bg-black/80 hover:border-white'
            }
        `}
      >
        {/* Animated Visualizer Bars (Fake) */}
        {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-30 pointer-events-none">
                <div className="w-1 bg-neon-cyan animate-[pulse_0.5s_ease-in-out_infinite] h-4"></div>
                <div className="w-1 bg-neon-cyan animate-[pulse_0.7s_ease-in-out_infinite] h-8"></div>
                <div className="w-1 bg-neon-cyan animate-[pulse_0.4s_ease-in-out_infinite] h-5"></div>
                <div className="w-1 bg-neon-cyan animate-[pulse_0.6s_ease-in-out_infinite] h-3"></div>
            </div>
        )}

        {/* Icon */}
        <div className={`relative z-10 transition-colors ${isPlaying ? 'text-neon-cyan' : 'text-gray-400'}`}>
            {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
            )}
        </div>
        
        {/* Corner Decals */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50"></div>
      </button>

      {/* Label */}
      <div className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">
          {isPlaying ? `${t.audio.label}: ON` : `${t.audio.label}: OFF`}
      </div>
    </div>
  );
};

export default AudioController;
