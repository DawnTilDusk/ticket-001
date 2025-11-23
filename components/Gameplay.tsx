
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import RevealOnScroll from './RevealOnScroll';

const Gameplay: React.FC = () => {
  const [erosionLevel, setErosionLevel] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Erosion Simulator Logic
  const handleErosionMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Real position relative to container
    const realX = e.clientX - rect.left;
    const realY = e.clientY - rect.top;

    // Add drift based on erosion level
    const drift = erosionLevel * 2; // Pixel multiplier
    const time = Date.now() / 200;
    
    const driftX = Math.sin(time) * drift;
    const driftY = Math.cos(time * 1.5) * drift;

    setCursorPos({
      x: Math.max(0, Math.min(rect.width, realX + driftX)),
      y: Math.max(0, Math.min(rect.height, realY + driftY))
    });

    // Increase erosion slowly on movement
    if (erosionLevel < 50) {
        setErosionLevel(prev => prev + 0.2);
    }
  };

  const [ghostActive, setGhostActive] = useState(false);
  
  const handleGhostClick = () => {
    setGhostActive(true);
    // Duration matches the animation sequence in GhostOverlay
    setTimeout(() => setGhostActive(false), 3000);
  };

  return (
    <section id="features" className="py-24 bg-cyber-black relative">
      {/* Immersive Overlay Component */}
      {ghostActive && <GhostOverlay />}

      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
            <h2 className="font-display text-4xl text-white mb-16 text-center">
                {t.gameplay.title_main}<span className="text-neon-green">{t.gameplay.title_highlight}</span>
            </h2>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Mechanic 1: Erosion Simulator */}
            <RevealOnScroll delay={0}>
                <div className="bg-cyber-gray/50 border border-white/5 p-6 rounded-lg flex flex-col h-full">
                    <h3 className="text-neon-red font-display text-xl mb-2">{t.gameplay.erosion_title}</h3>
                    <p className="text-gray-400 text-sm mb-4 h-16">{t.gameplay.erosion_desc}</p>
                    
                    <div className="mb-2 flex justify-between text-xs font-mono text-neon-red">
                        <span>{t.gameplay.erosion_label}：{Math.floor(erosionLevel)}%</span>
                        <button onClick={() => setErosionLevel(0)} className="underline hover:text-white">{t.gameplay.reset}</button>
                    </div>
                    
                    <div 
                        ref={containerRef}
                        onMouseMove={handleErosionMove}
                        onMouseLeave={() => setErosionLevel(0)}
                        className="relative h-64 bg-black border border-neon-red/30 rounded overflow-hidden cursor-none group"
                    >
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white/10 font-bold text-4xl select-none">
                            {t.gameplay.test_area}
                        </div>
                        
                        {/* Custom Drifting Cursor */}
                        <div 
                            className="absolute w-4 h-4 border-2 border-neon-cyan rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(165,243,252,0.8)]"
                            style={{ left: cursorPos.x, top: cursorPos.y }}
                        >
                            <div className="absolute top-full left-1/2 h-4 w-[1px] bg-neon-cyan/50"></div>
                            <div className="absolute left-full top-1/2 w-4 h-[1px] bg-neon-cyan/50"></div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 font-mono">{t.gameplay.drift_instr}</p>
                </div>
            </RevealOnScroll>

            {/* Mechanic 2: Ghosting (Enhanced UI) */}
            <RevealOnScroll delay={200}>
                <div className="bg-cyber-gray/50 border border-white/5 p-6 rounded-lg flex flex-col relative overflow-hidden group h-full">
                    <h3 className="text-neon-cyan font-display text-xl mb-2 relative z-10">{t.gameplay.ghost_title}</h3>
                    <p className="text-gray-400 text-sm mb-4 h-16 relative z-10">
                        {t.gameplay.ghost_desc}
                        <span className="block mt-1 text-xs text-neon-cyan/60 font-mono">{t.gameplay.ghost_warn}</span>
                    </p>
                    
                    <div className="flex-grow flex items-center justify-center relative z-10 mt-2">
                        <button 
                            onClick={handleGhostClick}
                            className="group/btn relative w-full h-16 bg-black border border-neon-cyan/50 overflow-hidden transition-all hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(165,243,252,0.3)] active:scale-95"
                        >
                            {/* Background Scan Animation */}
                            <div className="absolute inset-0 bg-neon-cyan/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                            
                            {/* Button Content */}
                            <div className="relative flex items-center justify-center space-x-3 h-full">
                                <span className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan"></span>
                                </span>
                                <span className="font-display font-bold text-lg tracking-widest text-white group-hover/btn:text-neon-cyan transition-colors">
                                    {t.gameplay.ghost_btn}
                                </span>
                                <svg className="w-5 h-5 text-gray-500 group-hover/btn:text-neon-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            </div>
                            
                            {/* Tech Corners */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-cyan"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-cyan"></div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-cyan opacity-50"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-cyan opacity-50"></div>
                        </button>
                    </div>

                    {/* Background decoration for card */}
                    <div className="absolute -bottom-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-neon-cyan animate-spin-slow">
                            <circle cx="50" cy="50" r="40" strokeWidth="1" strokeDasharray="4 4" />
                            <circle cx="50" cy="50" r="25" strokeWidth="0.5" />
                            <path d="M50 10 L50 90 M10 50 L90 50" strokeWidth="0.5" />
                        </svg>
                    </div>
                </div>
            </RevealOnScroll>

            {/* Mechanic 3: Memory Override */}
            <RevealOnScroll delay={400}>
                <VisualOverrideCard />
            </RevealOnScroll>

        </div>
      </div>
    </section>
  );
};

const GhostOverlay: React.FC = () => {
    const [lines, setLines] = useState<string[]>([]);
    const { t } = useLanguage();
    
    // Simulate terminal boot sequence
    useEffect(() => {
        const bootText = [
            "INIT_NEURAL_LINK...",
            "BYPASSING_CORTEX_FIREWALL...",
            "injecting: ghost_driver.exe",
            "WARNING: SYNAPSE OVERLOAD DETECTED",
            "OPTIMIZING MOTOR FUNCTIONS...",
            "SUPPRESSING EMOTIONAL CENTRES...",
            "SYNC_RATE: 100%",
            "CONTROL_TRANSFERRED."
        ];
        
        let i = 0;
        const interval = setInterval(() => {
            if (i < bootText.length) {
                setLines(prev => [...prev, bootText[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 250); // Speed of text
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] bg-black cursor-none overflow-hidden font-mono flex items-center justify-center">
            {/* Background Strobing & Noise */}
            <div className="absolute inset-0 bg-neon-red/10 animate-pulse mix-blend-screen"></div>
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise.png")'}}></div>
            
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-20"></div>

            {/* Glitch Container */}
            <div className="relative z-30 w-full max-w-4xl p-8 border-y-2 border-neon-red bg-black/80 backdrop-blur flex flex-col items-center animate-shake">
                
                {/* Header */}
                <div className="w-full flex justify-between text-neon-red text-sm mb-8 font-bold tracking-widest uppercase">
                    <span>System_Alert: Critical</span>
                    <span className="animate-pulse">Override_Active</span>
                </div>

                {/* Main Glitch Text */}
                <h1 className="text-5xl md:text-8xl font-black text-white mix-blend-difference relative mb-4 font-display tracking-tighter whitespace-nowrap">
                    <span className="block absolute inset-0 text-neon-cyan translate-x-1 animate-glitch opacity-70">{t.gameplay.ghost_override_text}</span>
                    <span className="block absolute inset-0 text-neon-red -translate-x-1 animate-glitch opacity-70" style={{animationDelay: '0.1s'}}>{t.gameplay.ghost_override_text}</span>
                    {t.gameplay.ghost_override_text}
                </h1>

                {/* Terminal Output */}
                <div className="w-full max-w-md mt-8 font-mono text-neon-cyan text-sm h-32 overflow-hidden flex flex-col justify-end">
                    {lines.map((line, idx) => (
                        <div key={idx} className="opacity-80">> {line}</div>
                    ))}
                    <div className="w-3 h-4 bg-neon-cyan animate-pulse inline-block mt-1"></div>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md h-2 bg-gray-900 mt-4 overflow-hidden border border-gray-700">
                    <div className="h-full bg-neon-red w-full animate-[scanline_2s_ease-in-out]"></div>
                </div>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-80 z-10" style={{background: 'radial-gradient(circle, transparent 40%, black 100%)'}}></div>
        </div>
    );
};

const VisualOverrideCard: React.FC = () => {
    const [active, setActive] = useState(false);
    const { t } = useLanguage();

    return (
        <div className="bg-cyber-gray/50 border border-white/5 p-6 rounded-lg flex flex-col h-full">
            <h3 className="text-neon-green font-display text-xl mb-2">{t.gameplay.memory_title}</h3>
            <p className="text-gray-400 text-sm mb-4 h-16">{t.gameplay.memory_desc}</p>
            
            <div className="flex-grow relative h-64 rounded overflow-hidden group border border-white/5">
                {/* Toggle Switch */}
                <div className="absolute top-4 right-4 z-20 flex items-center bg-black/90 rounded-full px-3 py-1 border border-neon-green/30 backdrop-blur">
                    <span className="text-[10px] font-mono text-white mr-2">{active ? t.gameplay.memory_sys_active : t.gameplay.memory_raw}</span>
                    <div 
                        onClick={() => setActive(!active)}
                        className={`w-8 h-4 rounded-full cursor-pointer p-0.5 transition-colors ${active ? 'bg-neon-green' : 'bg-gray-600'}`}
                    >
                        <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${active ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                </div>

                {/* Images */}
                <img 
                    src="https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?q=80&w=2836&auto=format&fit=crop" 
                    alt="Raw" 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${active ? 'opacity-0' : 'opacity-100'} filter grayscale brightness-75 contrast-125`} 
                />
                
                <div className={`absolute inset-0 w-full h-full bg-black transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}>
                     {/* Simulation of AI Vision */}
                     <div className="w-full h-full relative bg-gray-900 overflow-hidden">
                        
                        {/* Grid Background */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(45,212,191,0.1)_25%,rgba(45,212,191,0.1)_50%,transparent_50%,transparent_75%,rgba(45,212,191,0.1)_75%,rgba(45,212,191,0.1)_100%)] bg-[length:4px_4px]"></div>
                        
                        {/* Moving Scanline */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-green/20 to-transparent h-[30%] w-full animate-[scanline_3s_linear_infinite] pointer-events-none mix-blend-screen"></div>

                        {/* Central Target - Stronger Glow */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center">
                             {/* Static Outer Ring */}
                             <div className="absolute inset-0 border-2 border-neon-green rounded-full opacity-60 shadow-[0_0_20px_rgba(45,212,191,0.4)]"></div>
                             
                             {/* Rotating Inner Ring */}
                             <div className="absolute inset-2 border-2 border-neon-green/80 rounded-full border-t-transparent animate-spin opacity-80"></div>
                             
                             {/* Text */}
                             <span className="text-neon-green font-mono text-xs animate-pulse font-bold tracking-[0.2em] drop-shadow-[0_0_8px_rgba(45,212,191,1)]">
                                {t.gameplay.locking}
                             </span>
                        </div>
                        
                        {/* HUD Corners */}
                        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-neon-green opacity-70"></div>
                        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-neon-green opacity-70"></div>
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-neon-green opacity-70"></div>
                        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-neon-green opacity-70"></div>

                        {/* Data Overlay */}
                        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-neon-green leading-tight">
                            <span className="block mb-1 text-white/40">{t.gameplay.mem_sector} <span className="text-red-500 font-bold bg-red-500/10 px-1 animate-pulse">{t.gameplay.corrupted}</span></span>
                            <span className="block mb-1">{t.gameplay.rewrite} <span className="text-neon-green animate-[pulse_0.15s_infinite]">{t.gameplay.active}</span></span>
                            <span className="block opacity-60">Latency: 0.002ms</span>
                        </div>
                        
                        {/* Decorative Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
                            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
                            <circle cx="50%" cy="50%" r="45%" stroke="#2DD4BF" strokeWidth="0.5" opacity="0.1" fill="none" />
                        </svg>
                     </div>
                </div>
            </div>
        </div>
    );
}

export default Gameplay;
