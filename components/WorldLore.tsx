
import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import RevealOnScroll from './RevealOnScroll';

const WorldLore: React.FC = () => {
  const { t } = useLanguage();
  const loreItems = t.lore.items;
  const [activeId, setActiveId] = useState('');

  // Ensure activeId is valid when language changes or on mount
  useEffect(() => {
    if (loreItems.length > 0) {
        setActiveId(loreItems[0].id);
    }
  }, [loreItems]);

  return (
    <section id="lore" className="py-24 bg-cyber-dark border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-12">
        
        {/* Navigation / List */}
        <div className="md:w-1/3 space-y-4">
          <RevealOnScroll direction="left">
            <h2 className="font-display text-3xl text-white mb-8">{t.lore.title}</h2>
            {loreItems.map((item, index) => (
                <div key={item.id} style={{ transitionDelay: `${index * 100}ms` }}>
                    <button
                    onClick={() => setActiveId(item.id)}
                    className={`w-full text-left p-4 border-l-4 transition-all duration-300 ${
                        activeId === item.id 
                        ? 'border-neon-cyan bg-white/5 text-white' 
                        : 'border-white/10 text-gray-500 hover:text-gray-300'
                    }`}
                    >
                    <div className="font-bold font-display tracking-wider">{item.title}</div>
                    <div className="text-xs font-mono mt-1 opacity-70">{item.role}</div>
                    </button>
                </div>
            ))}
          </RevealOnScroll>
        </div>

        {/* Display Area */}
        <div className="md:w-2/3 min-h-[300px] relative">
            <RevealOnScroll direction="right" className="h-full">
                {loreItems.map((item) => (
                    <div 
                    key={item.id}
                    className={`absolute inset-0 transition-all duration-500 transform ${
                        activeId === item.id 
                        ? 'opacity-100 translate-x-0 pointer-events-auto' 
                        : 'opacity-0 translate-x-8 pointer-events-none'
                    }`}
                    >
                    <div className="h-full border border-white/10 bg-black p-8 relative overflow-hidden">
                        {/* Decorative Background Number */}
                        <span className="absolute -bottom-10 -right-10 text-9xl font-black text-white/5 select-none">
                            {item.id === 'elites' ? '01' : item.id === 'workers' ? '02' : '03'}
                        </span>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-neon-cyan/10 text-neon-cyan flex items-center justify-center rounded-full mb-6">
                                <div className="font-mono text-2xl font-bold">{item.title[0]}</div>
                            </div>
                            
                            <h3 className="text-3xl font-display text-white mb-2">{item.title}</h3>
                            <h4 className="text-neon-red font-mono text-sm mb-6">{t.lore.category_label}：{item.role}</h4>
                            
                            <p className="font-sans text-gray-300 text-lg leading-relaxed border-l-2 border-gray-700 pl-6">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                    </div>
                ))}
            </RevealOnScroll>
        </div>

      </div>
    </section>
  );
};

export default WorldLore;
