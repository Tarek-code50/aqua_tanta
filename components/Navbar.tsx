import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useData } from '../contexts/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe, Phone } from 'lucide-react';

interface NavbarProps {
  scrollToSection: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { settings } = useData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const navItems = [
    { label: t.nav.home, id: 'home' },
    { label: t.nav.products, id: 'products' },
    { label: t.nav.maintenance, id: 'maintenance' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg h-16 shadow-md border-slate-200/50 dark:border-slate-800/50'
            : 'bg-transparent h-24 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <div
              className="flex-shrink-0 flex items-center cursor-pointer gap-2"
              onClick={() => scrollToSection('home')}
            >
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-brand-500/30">
                A
              </div>
              <span
                className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-primary font-cairo ${!isScrolled && theme === 'dark' ? 'text-white' : ''}`}
              >
                Aqua Tanta
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-bold tracking-wide transition-colors relative group ${
                    !isScrolled && theme === 'dark'
                      ? 'text-slate-100'
                      : 'text-slate-600 dark:text-slate-300'
                  } hover:text-brand-600 dark:hover:text-brand-400`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Tools */}
            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                {theme === 'light' ? (
                  <Moon size={20} className="text-slate-600" />
                ) : (
                  <Sun size={20} className={isScrolled ? 'text-slate-300' : 'text-white'} />
                )}
              </button>

              <button
                onClick={toggleLanguage}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                  isScrolled
                    ? 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    : 'border-white/20 text-slate-800 dark:text-white bg-white/10 backdrop-blur-md'
                }`}
              >
                <Globe size={14} />
                <span>{language === 'ar' ? 'EN' : 'AR'}</span>
              </button>

              <a
                href={`https://wa.me/${settings.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-primary hover:opacity-90 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-brand-500/30 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <Phone size={16} />
                <span>{t.nav.contact}</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 ${!isScrolled && theme === 'dark' ? 'text-white' : 'text-slate-800 dark:text-white'}`}
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: language === 'ar' ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: language === 'ar' ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 bottom-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-[80%] max-w-sm bg-white dark:bg-slate-900 z-50 shadow-2xl flex flex-col`}
            >
              <div className="p-6 flex justify-between items-center border-b border-slate-100 dark:border-slate-800">
                <span className="text-xl font-bold font-cairo text-brand-600">Aqua Tanta</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                >
                  <X size={24} className="text-slate-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left rtl:text-right px-4 py-4 rounded-xl text-lg font-bold text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="p-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex gap-4">
                  <button
                    onClick={toggleTheme}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
                  </button>
                  <button
                    onClick={toggleLanguage}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    <Globe size={18} />
                    <span>{language === 'ar' ? 'English' : 'العربية'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
