
import React from 'react';
import GlitchText from './GlitchText';
import { useLanguage } from './LanguageContext';

const Navigation: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const links = [
    { name: t.nav.hero, href: '#hero' },
    { name: t.nav.conflict, href: '#conflict' },
    { name: t.nav.features, href: '#features' },
    { name: t.nav.lore, href: '#lore' },
    { name: t.nav.cta, href: '#cta' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-cyber-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-display font-bold text-xl tracking-wider text-white">
          <span className="text-neon-red">2050</span>
          <span className="text-white/80">.GC</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <a 
              key={link.href} // Changed key to href since name changes with lang
              href={link.href}
              className="font-mono text-sm text-white/70 hover:text-neon-cyan transition-colors"
            >
              <GlitchText text={link.name} />
            </a>
          ))}

          {/* Language Switcher */}
          <div className="flex items-center space-x-2 font-mono text-xs border-l border-white/20 pl-6 ml-2">
            <button 
                onClick={() => setLanguage('zh')}
                className={`transition-colors hover:text-neon-cyan ${language === 'zh' ? 'text-neon-red font-bold' : 'text-gray-500'}`}
            >
                CN
            </button>
            <span className="text-gray-700">/</span>
            <button 
                onClick={() => setLanguage('en')}
                className={`transition-colors hover:text-neon-cyan ${language === 'en' ? 'text-neon-red font-bold' : 'text-gray-500'}`}
            >
                EN
            </button>
          </div>
        </div>

        <div className="md:hidden text-neon-red animate-pulse">
          {t.nav.network_limit}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
