import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Maintenance from './pages/Maintenance';
import Admin from './pages/Admin';
import Login from './pages/Login';
import WhatsAppButton from './components/WhatsAppButton';
import WaveDivider from './components/WaveDivider';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const PublicLayout: React.FC = () => {
  const { t } = useLanguage();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-500 selection:text-white">
      <Navbar scrollToSection={scrollToSection} />

      <main className="relative z-0">
        <Home />
        <Products />
        <Maintenance />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 relative pt-24 pb-12 mt-20">
        <WaveDivider position="top" color="text-slate-50 dark:text-slate-800/50" flip />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  A
                </div>
                <span className="text-2xl font-bold text-white font-cairo">Aqua Tanta</span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Providing Tanta with the purest water solutions since 2015. We believe every family
                deserves clean, healthy water.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-brand-400" />
                  <span>+20 101 290 2182</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-brand-400" />
                  <span>info@aquatanta.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand-400 mt-1" />
                  <span>
                    El-Galaa St., Tanta,
                    <br />
                    Gharbia Governorate
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 hover:bg-brand-600 rounded-full flex items-center justify-center transition-all hover:-translate-y-1"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all hover:-translate-y-1"
                >
                  <Instagram size={20} />
                </a>
              </div>
              <div className="mt-8">
                <a
                  href="#login"
                  className="text-xs text-slate-600 hover:text-slate-400 transition-colors uppercase tracking-widest"
                >
                  {t.nav.login}
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>{t.footer.copyright}</p>
            <p className="mt-2 md:mt-0">Designed with 💙 for Tanta</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <WhatsAppButton
          message="General Inquiry"
          variant="icon"
          className="h-14 w-14 flex items-center justify-center animate-bounce shadow-2xl shadow-green-500/40"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          }
        />
      </div>
    </div>
  );
};

// ... keep routing logic from previous App.tsx
const MainRouter: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState('home');
  const { user } = useAuth();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin' || hash === 'login') {
        setCurrentRoute(hash);
      } else {
        setCurrentRoute('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Simple Logic Routing
  if (currentRoute === 'admin') return <Admin />;
  if (currentRoute === 'login') return user ? <Admin /> : <Login />;

  return <PublicLayout />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DataProvider>
          <AuthProvider>
            <MainRouter />
          </AuthProvider>
        </DataProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
